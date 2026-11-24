"""Crea un parche de ojos (u otra zona) para cambiar un gesto sobre una escena.

Uso:  python3 tools/parche_ojos.py <escena.png> <pose_base.png> <pose_nueva.png> x0 y0 x1 y1 <salida.png>

Toma la zona (x0,y0,x1,y1) de <pose_nueva>, corrige su color para que calce con
<escena> (comparando contra <pose_base>, que es la misma pose de la escena) y la
guarda como PNG con borde difuminado, listo para superponer sobre la escena.
"""
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def main() -> None:
    esc, base, nueva = (Image.open(p).convert("RGB") for p in sys.argv[1:4])
    x0, y0, x1, y1 = map(int, sys.argv[4:8])
    out = sys.argv[8]
    caja = (x0, y0, x1, y1)
    e = np.asarray(esc.crop(caja)).astype(float)
    b = np.asarray(base.resize(esc.size).crop(caja)).astype(float)
    n = np.asarray(nueva.resize(esc.size).crop(caja)).astype(float)
    # ajuste de color por canal: lleva la pose nueva al tono de la escena
    corr = n + (e.mean(axis=(0, 1)) - b.mean(axis=(0, 1)))
    corr = np.clip(corr, 0, 255).astype(np.uint8)
    w, h = x1 - x0, y1 - y0
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).ellipse((w * 0.08, h * 0.1, w * 0.92, h * 0.9), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(min(w, h) * 0.12))
    rgba = Image.fromarray(corr, "RGB").convert("RGBA")
    rgba.putalpha(m)
    rgba.save(out)
    print("parche", out, caja)


if __name__ == "__main__":
    main()
