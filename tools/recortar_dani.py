"""Recorta a Dani (o Dani + mueble) del fondo liso de Flow.

Uso:  python3 tools/recortar_dani.py <carpeta_entrada> <carpeta_salida>

Método: estima el color del fondo en los bordes y rellena por inundación
desde todo el borde con los píxeles parecidos a ese color (se detiene en
los contornos entintados). Genera un PNG con transparencia y borde suavizado.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

TOL = 16          # distancia de color máxima al fondo
# bordes desde donde se borra el fondo (por defecto los cuatro);
# si un mueble toca un borde, ese borde no se usa
SEMILLAS = {"borde-cama": ["top", "right"]}


def recortar(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(np.int16)
    h, w, _ = a.shape
    borde = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(borde, axis=0)
    dist = np.abs(a - bg).max(axis=2)
    parecido = dist < TOL
    etiquetas, _ = ndimage.label(parecido)
    lados = {"top": etiquetas[0], "bottom": etiquetas[-1],
             "left": etiquetas[:, 0], "right": etiquetas[:, -1]}
    usar = SEMILLAS.get(next((k for k in SEMILLAS if k in src.name), ""), list(lados))
    tocan_borde = np.unique(np.concatenate([lados[k] for k in usar]))
    fondo = np.isin(etiquetas, tocan_borde[tocan_borde > 0])
    alpha = np.where(fondo, 0, 255).astype(np.uint8)
    am = Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = im.convert("RGBA")
    out.putalpha(am)
    out.save(dst)


if __name__ == "__main__":
    ent, sal = Path(sys.argv[1]), Path(sys.argv[2])
    sal.mkdir(parents=True, exist_ok=True)
    for f in sorted(ent.glob("*.png")):
        recortar(f, sal / f.name)
        print("ok", f.name)
