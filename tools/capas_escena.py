"""Separa una escena de Flow en capas animables para HyperFrames.

Uso:  python3 tools/capas_escena.py <config.json>

El config indica la imagen de la escena, la carpeta de salida y las capas
(en píxeles de la imagen original):
  {"escena": "...png", "salida": "hyperframes/reel2/assets/cama",
   "capas": [
     {"nombre": "cortina", "tipo": "franja", "caja": [x0, y0, x1, y1]},
     {"nombre": "planta",  "tipo": "color",  "caja": [x0, y0, x1, y1]},
     {"nombre": "respira", "tipo": "elipse", "caja": [x0, y0, x1, y1]}
   ]}

- franja: un rectángulo tal cual (por ejemplo la cortina); se borra del fondo.
- color:  solo los píxeles con color y su contorno (por ejemplo las hojas); se borra del fondo.
- elipse: una elipse con borde difuminado (respiración de Dani); NO se borra del fondo.
Escribe fondo.png (sin las capas que se mueven, rellenado) y una capa PNG con
transparencia por elemento, más capas.json con las posiciones.
"""
import json
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


def main(cfg_path: str) -> None:
    cfg = json.loads(Path(cfg_path).read_text())
    src = np.asarray(Image.open(cfg["escena"]).convert("RGB"))
    h, w, _ = src.shape
    out = Path(cfg["salida"])
    out.mkdir(parents=True, exist_ok=True)
    borrar = np.zeros((h, w), np.uint8)
    rellenar_pared = []  # franjas: debajo va el color de la pared, no un relleno borroso
    info = {"ancho": w, "alto": h, "capas": []}
    hsv = cv2.cvtColor(src, cv2.COLOR_RGB2HSV)

    for c in cfg["capas"]:
        x0, y0, x1, y1 = c["caja"]
        alpha = np.zeros((h, w), np.uint8)
        if c["tipo"] == "franja":
            alpha[y0:y1, x0:x1] = 255
            rellenar_pared.append((x0, y0, x1, y1))
        elif c["tipo"] == "color":
            sat = (hsv[..., 1] > 40) & (hsv[..., 2] > 30)
            caja = np.zeros_like(sat)
            caja[y0:y1, x0:x1] = True
            base = (sat & caja).astype(np.uint8) * 255
            base = cv2.dilate(base, np.ones((7, 7), np.uint8))
            no_blanco = (src.min(axis=2) < 235).astype(np.uint8) * 255
            alpha = cv2.bitwise_and(base, no_blanco)
            alpha = cv2.dilate(alpha, np.ones((3, 3), np.uint8))
            borrar |= cv2.dilate(alpha, np.ones((5, 5), np.uint8))
        elif c["tipo"] == "elipse":
            cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
            cv2.ellipse(alpha, (cx, cy), ((x1 - x0) // 2, (y1 - y0) // 2), 0, 0, 360, 255, -1)
            alpha = cv2.GaussianBlur(alpha, (0, 0), 12)
        if c["tipo"] != "elipse":
            alpha = cv2.GaussianBlur(alpha, (0, 0), 0.8)
        rgba = np.dstack([src, alpha])[y0:y1, x0:x1]
        Image.fromarray(rgba, "RGBA").save(out / f"{c['nombre']}.png")
        info["capas"].append({"nombre": c["nombre"], "x": x0, "y": y0, "w": x1 - x0, "h": y1 - y0})

    fondo = cv2.inpaint(src, borrar, 6, cv2.INPAINT_TELEA) if borrar.any() else src.copy()
    for x0, y0, x1, y1 in rellenar_pared:
        izq = src[y0:y1, max(0, x0 - 12):x0].reshape(-1, 3)
        pared = np.median(izq, axis=0).astype(np.uint8) if izq.size else np.array([252, 251, 248], np.uint8)
        fondo[y0:y1, x0:x1] = pared
    Image.fromarray(fondo).save(out / "fondo.png")
    Image.fromarray(src).save(out / "escena.png")
    (out / "capas.json").write_text(json.dumps(info, indent=2))
    print("capas:", [c["nombre"] for c in info["capas"]], "→", out)


if __name__ == "__main__":
    main(sys.argv[1])
