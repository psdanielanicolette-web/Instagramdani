"""Control de calidad de una escena de fondo.

Uso:  python3 tools/medir_fondo.py <escena.png> [<dani_recortada.png>]

Mide, en el FONDO (sin Dani si se entrega su recorte alineado):
- color: % de píxeles con color (saturación > 0,18). Regla de la marca: ≤ 20 %.
- tinta: % de línea negra (densidad de elementos). Referencias −20 % ≈ 6-8 %.
- grosor de línea: en px a 1080 de ancho. Regla: ≈ 3 px (línea normal).
- tercio superior: % de píxeles no blancos en y < 1/3 (debe quedar casi vacío).
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def medir(ruta: str, ruta_dani: str | None = None) -> None:
    im = Image.open(ruta).convert("RGB")
    w, h = im.size
    hsv = np.asarray(im.convert("HSV")).astype(float) / 255
    gris = np.asarray(im.convert("L"))
    fondo = np.ones((h, w), bool)
    if ruta_dani:
        d = Image.open(ruta_dani).convert("RGBA").resize((w, h))
        fondo &= np.asarray(d)[..., 3] < 128
    color = (hsv[..., 1] > 0.18) & (hsv[..., 2] > 0.15)
    tinta = gris < 110
    dt = ndimage.distance_transform_edt(tinta)
    cresta = dt[(dt > 0) & (ndimage.maximum_filter(dt, 3) == dt)]
    grosor = 2 * float(np.median(cresta)) * 1080 / w if cresta.size else 0.0
    sup = (gris[: h // 3] < 235).mean()
    pc = 100 * color[fondo].mean()
    print(f"{ruta}")
    print(f"  color en el fondo:  {pc:5.1f} %   {'OK' if pc <= 20 else 'SUPERA EL 20 %'}")
    print(f"  tinta (densidad):   {100 * tinta[fondo].mean():5.1f} %   (referencias −20 % ≈ 6-8 %)")
    print(f"  grosor de línea:    {grosor:5.1f} px a 1080   (línea normal ≈ 3 px)")
    print(f"  tercio superior:    {100 * sup:5.1f} % ocupado   (debe ser casi 0)")


if __name__ == "__main__":
    medir(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
