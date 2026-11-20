#!/usr/bin/env python3
"""Genera o edita una imagen con Nano Banana 2.1 (API de Gemini), en 9:16.

Uso:
  python3 tools/gemini_imagen.py SALIDA.png "prompt" [imagen_base.png referencia2.webp ...]

La primera imagen es la que se edita; las demás son referencias (por ejemplo el
rostro oficial). La clave la inyecta el proxy del entorno; si existe
GEMINI_API_KEY se usa esa.
"""
import base64, json, mimetypes, os, sys, time, urllib.request, urllib.error

MODELO = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-nano-banana-2.1")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODELO}:generateContent"


def parte_imagen(ruta):
    mime = mimetypes.guess_type(ruta)[0] or "image/png"
    with open(ruta, "rb") as f:
        return {"inlineData": {"mimeType": mime, "data": base64.b64encode(f.read()).decode()}}


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    salida, prompt, imagenes = sys.argv[1], sys.argv[2], sys.argv[3:]
    partes = [parte_imagen(r) for r in imagenes] + [{"text": prompt}]
    cuerpo = {
        "contents": [{"role": "user", "parts": partes}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": "9:16"},
        },
    }
    clave = os.environ.get("GEMINI_API_KEY", "inyectada-por-proxy")
    for intento in range(5):
        req = urllib.request.Request(
            URL, data=json.dumps(cuerpo).encode(),
            headers={"Content-Type": "application/json", "x-goog-api-key": clave},
        )
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                datos = json.load(r)
            break
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:400]
            if e.code in (429, 500, 503) and intento < 4:
                print(f"  {e.code}, reintento en {10 * (intento + 1)} s…", file=sys.stderr)
                time.sleep(10 * (intento + 1))
                continue
            sys.exit(f"Error {e.code}: {msg}")
    for cand in datos.get("candidates", []):
        for p in cand.get("content", {}).get("parts", []):
            if "inlineData" in p:
                os.makedirs(os.path.dirname(salida) or ".", exist_ok=True)
                with open(salida, "wb") as f:
                    f.write(base64.b64decode(p["inlineData"]["data"]))
                print(salida)
                return
    sys.exit("Sin imagen en la respuesta: " + json.dumps(datos)[:600])


if __name__ == "__main__":
    main()
