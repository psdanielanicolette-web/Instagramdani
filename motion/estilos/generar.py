#!/usr/bin/env python3
"""Genera 6 estilos de video (HyperFrames) con el guion validado del Reel 2 · Burnout.

Uso:  python3 motion/estilos/generar.py
Crea motion/estilos/<estilo>/index.html y copia los assets necesarios.
Renderizar uno:  cd motion/estilos/<estilo> && npx hyperframes render
"""
import html, os, shutil

AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(AQUI, "..", ".."))

# --- Guion validado (Teo, 20-11-2026). No se cambia el texto. ---
# (id, texto, inicio, fin, palabras_borgona)
BEATS = [
    ("b1", "Dormí todo el fin de semana.", 0.9, 3.6, set()),
    ("b2", "Llegó el lunes y amanecí igual de vacía.", 3.8, 7.2, {"vacía."}),
    ("b3", "No es sueño atrasado.", 7.4, 9.6, set()),
    ("b4", "Dormir no lo repone.", 9.8, 12.0, set()),
    ("b5", "Estoy funcionando — pero no estoy.", 12.2, 15.6, {"no", "estoy."}),
    ("b6", "Quizá no necesito descansar más.", 15.8, 18.6, set()),
    ("b7", "Quizá esto que cargo tiene otra forma,", 18.8, 21.8, set()),
    ("b8", "y todavía no tiene nombre.", 22.0, None, set()),
]
DUR = 26

DANI = os.path.join(REPO, "video", "public", "dani")
FUENTES = os.path.join(REPO, "video", "public", "fonts")


def palabras(texto, borgona=frozenset(), clase="p"):
    out = []
    for w in texto.split(" "):
        k = " k" if w in borgona else ""
        out.append(f'<span class="{clase}{k}">{html.escape(w)}</span>')
    return " ".join(out)


def frase_html(b, clase_extra="", estilo=""):
    bid, texto, ini, fin, borg = b
    ini0 = round(max(ini - 0.1, 0), 2)
    dur = round((fin + 0.6 if fin else DUR) - ini0, 2)
    return (
        f'<div id="{bid}" class="frase clip {clase_extra}" data-start="{ini0}" data-duration="{dur}" '
        f'data-track-index="2"{(" style=%s" % chr(34) + estilo + chr(34)) if estilo else ""}>'
        f"{palabras(texto, borg)}</div>"
    )


BASE_CSS = """
@font-face { font-family: "Fraunces"; font-weight: 600; src: url("assets/fonts/Fraunces-600.woff2") format("woff2"); }
@font-face { font-family: "Inter"; font-weight: 500; src: url("assets/fonts/Inter-500.woff2") format("woff2"); }
:root { --blanco:#FFFEFE; --beige:#EED3BB; --arena:#D7B18F; --verde:#3F4A3A; --tinta:#1A1A1A; --borgona:#7D4F6A; --rosado:#F4D5DC; }
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:1080px; height:1920px; overflow:hidden; background:var(--blanco); }
#root { position:relative; width:100%; height:100%; overflow:hidden; background:var(--blanco); }
.capa { position:absolute; inset:0; }
.frase { position:absolute; left:92px; top:150px; width:800px; font-family:"Fraunces",serif; font-weight:600;
         font-size:76px; line-height:1.4; color:var(--tinta); }
.frase .p { display:inline-block; opacity:0; }
.frase .k { color:var(--borgona); }
.etq { font-family:"Inter",sans-serif; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; }
"""

BASE_JS = """
const tl = gsap.timeline({ paused: true });
// Texto de marca: palabra por palabra (0,12 s, 0,65 s, subida 18 px) y salida con fundido de 0,5 s
function frase(sel, ini, fin, opts) {
  opts = opts || {};
  tl.fromTo(sel + " .p", { opacity: 0, y: opts.sube ?? 18 }, { opacity: 1, y: 0, duration: 0.65, stagger: opts.stagger ?? 0.12, ease: "power2.out" }, ini);
  if (fin !== null && fin !== undefined) {
    if (opts.salida) opts.salida(sel, fin);
    else tl.to(sel + " .p", { opacity: 0, duration: 0.5, ease: "power1.in" }, fin);
  }
}
// Polvo en la luz: trayectorias fijas (deterministas)
function polvo(prefijo, n, t0) {
  for (let i = 1; i <= n; i++) {
    const dx = ((i * 37) % 60) - 30, dy = -40 - ((i * 23) % 60);
    tl.fromTo("#" + prefijo + i, { opacity: 0, x: 0, y: 0 }, { opacity: 0.9, duration: 1.6, ease: "sine.out" }, t0 + 0.25 * i);
    tl.to("#" + prefijo + i, { x: dx, y: dy, duration: %(dur)s - t0 - 0.25 * i - 0.1, ease: "sine.inOut" }, t0 + 0.25 * i);
  }
}
""".replace("%(dur)s", str(DUR))


def motas(prefijo, puntos, color="rgba(255,244,222,.95)", brillo="rgba(255,226,180,.9)"):
    return "\n".join(
        f'<span class="mota" id="{prefijo}{i+1}" style="position:absolute;left:{x}px;top:{y}px;width:6px;height:6px;'
        f'border-radius:50%;background:{color};box-shadow:0 0 10px {brillo};opacity:0"></span>'
        for i, (x, y) in enumerate(puntos)
    )


def pagina(titulo, css, cuerpo, js):
    return f"""<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>{titulo}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>{BASE_CSS}{css}</style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1080" data-height="1920">
{cuerpo}
    </div>
    <script>
{BASE_JS}
{js}
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
"""


def frases_js(beats=BEATS, **kw):
    return "\n".join(f'frase("#{b[0]}", {b[2]}, {"null" if b[3] is None else b[3]});' for b in beats)


# ---------------------------------------------------------------- 1 · Editorial
def editorial():
    css = """
#fantasma { position:absolute; left:-40px; top:1180px; font-family:"Fraunces",serif; font-weight:600; font-size:520px;
            line-height:1; color:var(--beige); white-space:nowrap; opacity:0; }
#hilo { position:absolute; left:92px; top:120px; width:3px; height:1660px; background:var(--tinta); transform-origin:top; }
#num { position:absolute; left:120px; top:1730px; font-size:28px; color:var(--tinta); }
#marca { position:absolute; right:92px; top:1730px; font-size:28px; color:var(--borgona); }
.frase { left:132px; top:520px; width:860px; font-size:104px; line-height:1.18; }
.ed .p { display:inline-block; }
#b8 { color:var(--borgona); top:640px; }
#veladura { background:var(--beige); opacity:0; }
"""
    beats_html = "\n".join(frase_html(b, "ed") for b in BEATS)
    cuerpo = f"""
      <div id="fondo" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="0">
        <div id="veladura" class="capa"></div>
        <div id="fantasma">lunes</div>
        <div id="hilo"></div>
        <div id="num" class="etq">Burnout · funcionar sin habitarse</div>
        <div id="marca" class="etq">@dani</div>
      </div>
{beats_html}"""
    js = """
tl.fromTo("#hilo", { scaleY: 0 }, { scaleY: 1, duration: 3.2, ease: "power2.inOut" }, 0);
tl.fromTo("#fantasma", { opacity: 0, x: 120 }, { opacity: 0.55, x: -260, duration: 26, ease: "none" }, 0);
tl.fromTo("#num, #marca", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.4);
// Ley del vector: cada frase sale hacia arriba y la siguiente entra desde abajo
function salidaArriba(sel, fin) { tl.to(sel + " .p", { opacity: 0, y: -40, duration: 0.5, stagger: 0.03, ease: "power2.in" }, fin); }
""" + "\n".join(
        f'frase("#{b[0]}", {b[2]}, {"null" if b[3] is None else b[3]}, {{ sube: 60, stagger: 0.09, salida: salidaArriba }});'
        for b in BEATS
    ) + """
// "pero no estoy." se queda un instante sola: el resto baja de opacidad
tl.to("#b5 .p:not(.k)", { opacity: 0.18, duration: 0.6, ease: "sine.inOut" }, 14.2);
tl.to("#veladura", { opacity: 0.45, duration: 1.6, ease: "sine.inOut" }, 21.2);
tl.to("#hilo", { backgroundColor: "#7D4F6A", duration: 1.2 }, 21.6);
"""
    return pagina("Estilo 1 · Editorial cinético", css, cuerpo, js), []


# ---------------------------------------------------------------- 2 · Line art que se dibuja
def lineart():
    trazos = [
        # pared y esquina
        "M 0 1240 L 330 980", "M 330 980 L 330 470", "M 330 980 L 1080 1330",
        # tablas del piso
        "M 0 1420 L 520 1060", "M 0 1610 L 700 1140", "M 0 1800 L 880 1220", "M 160 1920 L 1060 1300",
        "M 440 1920 L 1080 1480", "M 720 1920 L 1080 1680",
        # ventana
        "M 700 530 L 1000 610 L 1000 1090 L 700 1010 Z", "M 850 570 L 850 1050", "M 700 770 L 1000 850",
        # barra de la cortina
        "M 660 480 L 1040 580",
    ]
    cortina = ["M 680 492 C 700 650 660 830 690 1050", "M 720 502 C 740 660 700 840 728 1060", "M 760 513 C 775 670 745 850 765 1070"]
    paths = "\n".join(f'<path class="tr" d="{d}" pathLength="1" />' for d in trazos)
    cort = "\n".join(f'<path class="tr cort" d="{d}" pathLength="1" />' for d in cortina)
    css = """
svg { position:absolute; inset:0; }
.tr { fill:none; stroke:#1A1A1A; stroke-width:3; stroke-linecap:round; stroke-dasharray:1; stroke-dashoffset:1; }
#marco { fill:none; stroke:#D7B18F; stroke-width:9; stroke-dasharray:1; stroke-dashoffset:1; }
#luzpiso { fill:rgba(255,236,205,.0); }
.dani { position:absolute; left:0; width:1080px; height:1920px; opacity:0; }
#veladura { background:var(--beige); mix-blend-mode:multiply; opacity:0; }
"""
    pts = [(760, 520), (840, 640), (720, 700), (900, 760), (800, 900), (950, 560), (690, 980), (870, 1040)]
    beats_html = "\n".join(frase_html(b) for b in BEATS)
    cuerpo = f"""
      <div id="escena" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="0">
        <svg viewBox="0 0 1080 1920" width="1080" height="1920">
          <polygon id="luzpiso" points="700,1010 1000,1090 1080,1700 640,1500" />
          {paths}
          <path id="marco" d="M 700 530 L 1000 610 L 1000 1090 L 700 1010 Z" pathLength="1" />
          <g id="cortina">{cort}</g>
        </svg>
        <img id="d_cerrados" class="dani" src="assets/r2_cama-lado_ojos-cerrados.png" style="top:200px" alt="" />
        <img id="d_abiertos" class="dani" src="assets/r2_cama-lado_ojos-abiertos.png" style="top:200px" alt="" />
        <img id="d_arriba" class="dani" src="assets/r2_borde-cama_hombros-arriba.png" style="top:0px" alt="" />
        <img id="d_abajo" class="dani" src="assets/r2_borde-cama_hombros-abajo.png" style="top:0px" alt="" />
        {motas("m", pts)}
        <div id="veladura" class="capa"></div>
      </div>
{beats_html}"""
    js = """
// 1) El dormitorio se dibuja en line art
tl.to(".tr:not(.cort)", { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: "power2.inOut" }, 0);
tl.to("#marco", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 0.9);
tl.to(".cort", { strokeDashoffset: 0, duration: 1.0, stagger: 0.1, ease: "power2.out" }, 1.1);
tl.to("#luzpiso", { fill: "rgba(255,236,205,.55)", duration: 2.0, ease: "sine.inOut" }, 1.6);
// 2) Dani llega a todo color (la única con detalle)
tl.fromTo("#d_cerrados", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 1.4);
tl.to("#d_abiertos", { opacity: 1, duration: 0.5 }, 4.6);           // "Llegó el lunes": abre los ojos
tl.to("#d_cerrados", { opacity: 0, duration: 0.5 }, 4.6);
// 3) Cambio de plano: borde de la cama
tl.to("#d_abiertos", { opacity: 0, duration: 0.6 }, 7.0);
tl.to("#d_arriba", { opacity: 1, duration: 0.6 }, 7.0);
tl.to("#d_abajo", { opacity: 1, duration: 0.6 }, 13.6);             // "pero no estoy": los hombros caen
tl.to("#d_arriba", { opacity: 0, duration: 0.6 }, 13.6);
// Cortina que se mece (finito) y luz que respira
tl.to("#cortina", { x: 10, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: 9 }, 2.0);
tl.to("#luzpiso", { opacity: 0.6, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: 8 }, 4.0);
polvo("m", 8, 2.0);
// Cámara con deriva leve
tl.fromTo("#escena", { scale: 1.0 }, { scale: 1.08, x: -14, duration: 26, ease: "none" }, 0);
// Cierre: la luz baja con veladura cálida
tl.to("#veladura", { opacity: 0.4, duration: 1.5, ease: "sine.inOut" }, 21.3);
""" + frases_js()
    css += "#b8 { top:330px; color:var(--borgona); }"
    return pagina("Estilo 2 · Line art que se dibuja", css, cuerpo, js), [
        "r2_cama-lado_ojos-cerrados.png", "r2_cama-lado_ojos-abiertos.png",
        "r2_borde-cama_hombros-arriba.png", "r2_borde-cama_hombros-abajo.png"]


# ---------------------------------------------------------------- 3 · Diario íntimo
def diario():
    css = """
#hoja { background:#FFFEFE; }
.renglon { position:absolute; left:0; width:1080px; height:2px; background:#EED3BB; }
#margen { position:absolute; left:120px; top:0; width:2px; height:1920px; background:#F4D5DC; }
#fecha { position:absolute; left:150px; top:120px; font-size:28px; color:var(--borgona); }
.linea { position:absolute; left:150px; width:860px; font-family:"Fraunces",serif; font-weight:600; font-size:62px;
         line-height:84px; color:var(--tinta); white-space:nowrap; clip-path: inset(0 100% 0 0); }
.tachado { position:relative; display:inline-block; }
.raya { position:absolute; left:-4px; right:-4px; top:46px; height:6px; background:var(--borgona); transform-origin:left; }
#foto { position:absolute; left:560px; top:1180px; width:420px; height:560px; background:#FFFEFE; padding:22px 22px 80px;
        box-shadow: 0 18px 40px rgba(63,74,58,.18); }
#foto .img { width:100%; height:100%; background:#EED3BB; overflow:hidden; position:relative; }
#foto img { position:absolute; left:-150px; top:-60px; width:680px; }
#cinta { position:absolute; left:150px; top:-26px; width:140px; height:48px; background:rgba(244,213,220,.85); }
#pie { position:absolute; left:24px; bottom:18px; font-size:28px; color:#3F4A3A; }
#veladura { background:var(--beige); mix-blend-mode:multiply; opacity:0; }
"""
    renglones = "\n".join(f'<div class="renglon" style="top:{238 + 84 * i}px"></div>' for i in range(20))
    # líneas del diario (texto validado, cortado donde respira)
    L = [
        ("l1", "Dormí todo el fin de semana.", 0.9, 1.7),
        ("l2", "Llegó el lunes", 3.8, 0.9),
        ("l3", "y amanecí igual de vacía.", 4.8, 1.4),
        ("l4", None, 7.4, 1.3),
        ("l5", "Dormir no lo repone.", 9.8, 1.3),
        ("l6", "Estoy funcionando —", 12.2, 1.2),
        ("l7", "pero no estoy.", 13.6, 1.0),
    ]
    lineas = []
    for i, (lid, txt, ini, d) in enumerate(L):
        top = 182 + 84 * (i + 1)
        if txt is None:
            contenido = 'No es <span class="tachado">sueño atrasado<span class="raya" id="raya"></span></span>.'
        else:
            contenido = html.escape(txt)
        estilo = f"top:{top}px" + (";color:#7D4F6A" if lid == "l7" else "")
        lineas.append(f'<div id="{lid}" class="linea" style="{estilo}">{contenido}</div>')
    P2 = [("q1", "Quizá no necesito", 15.9, 1.0), ("q2", "descansar más.", 16.9, 1.0),
          ("q3", "Quizá esto que cargo", 18.9, 1.1), ("q4", "tiene otra forma,", 20.0, 1.0),
          ("q5", "y todavía no tiene nombre.", 22.2, 1.6)]
    lineas2 = []
    for i, (lid, txt, ini, d) in enumerate(P2):
        top = 182 + 84 * (i + 1) + (84 if i >= 2 else 0) + (84 if i >= 4 else 0)
        estilo = f"top:{top}px" + (";color:#7D4F6A" if lid == "q5" else "")
        lineas2.append(f'<div id="{lid}" class="linea" style="{estilo}">{html.escape(txt)}</div>')
    cuerpo = f"""
      <div id="hoja" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="0">
        {renglones}
        <div id="margen"></div>
        <div id="fecha" class="etq">lunes · 07:40</div>
        <div id="pag1" class="capa">{"".join(lineas)}</div>
        <div id="pag2" class="capa" style="opacity:0">{"".join(lineas2)}</div>
        <div id="foto"><div id="cinta"></div><div class="img"><img src="assets/r2_de-pie-taza_ojos-abiertos.png" alt="" /></div>
          <div id="pie" class="etq">el lunes</div></div>
        <div id="veladura" class="capa"></div>
      </div>"""
    js = "\n".join(
        f'tl.to("#{lid}", {{ clipPath: "inset(0 0% 0 0)", duration: {d}, ease: "power1.inOut" }}, {ini});'
        for lid, _, ini, d in L + P2
    ) + """
tl.fromTo("#foto", { opacity: 0, y: 60, rotation: -9 }, { opacity: 1, y: 0, rotation: -4, duration: 1.0, ease: "back.out(1.4)" }, 0.3);
tl.fromTo("#fecha", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.2);
tl.fromTo("#raya", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, 8.9);  // se tacha "sueño atrasado"
// Pasar la página: lo escrito se desvanece, la hoja queda y empieza lo que todavía no tiene nombre
tl.to("#pag1", { opacity: 0, y: -30, duration: 0.6, ease: "power2.in" }, 15.0);
tl.set("#pag2", { opacity: 1 }, 15.6);
tl.to("#foto", { rotation: -2, y: 10, duration: 10, ease: "sine.inOut" }, 15.6);
tl.to("#fecha", { opacity: 0.35, duration: 1 }, 15.6);
tl.to("#veladura", { opacity: 0.35, duration: 1.6, ease: "sine.inOut" }, 21.4);
"""
    return pagina("Estilo 3 · Diario íntimo", css, cuerpo, js), ["r2_de-pie-taza_ojos-abiertos.png"]


# ---------------------------------------------------------------- 4 · Collage editorial
def collage():
    css = """
#fondo { background:var(--beige); }
.bloque { position:absolute; }
#arco { left:300px; top:700px; width:640px; height:1000px; background:var(--rosado); border-radius:320px 320px 0 0; }
#papel { left:60px; top:620px; width:960px; height:1180px; background:#FFFEFE; }
#franja { left:0; top:1700px; width:1080px; height:220px; background:var(--verde); }
.dani { position:absolute; filter: drop-shadow(0 0 0 #fff) drop-shadow(6px 0 0 #FFFEFE) drop-shadow(-6px 0 0 #FFFEFE) drop-shadow(0 6px 0 #FFFEFE) drop-shadow(0 -6px 0 #FFFEFE); opacity:0; }
.tira { position:absolute; left:70px; background:#FFFEFE; padding:14px 26px; font-family:"Fraunces",serif; font-weight:600;
        font-size:66px; line-height:1.15; color:var(--tinta); box-shadow:0 10px 24px rgba(63,74,58,.12); opacity:0; white-space:nowrap; }
.tira.k { color:var(--borgona); }
.pill { position:absolute; padding:12px 22px; border-radius:40px; background:var(--verde); color:#FFFEFE; font-size:28px; opacity:0; }
#veladura { background:var(--beige); mix-blend-mode:multiply; opacity:0; }
"""
    tiras = [
        ("t1", "Dormí todo", 150, 0.9, 3.6), ("t2", "el fin de semana.", 250, 1.15, 3.6),
        ("t3", "Llegó el lunes", 150, 3.8, 7.2), ("t4", "y amanecí", 250, 4.4, 7.2), ("t5", "igual de vacía.", 350, 4.7, 7.2),
        ("t6", "No es sueño atrasado.", 150, 7.4, 9.6),
        ("t7", "Dormir no lo repone.", 150, 9.8, 12.0),
        ("t8", "Estoy funcionando —", 150, 12.2, 15.6), ("t9", "pero no estoy.", 250, 13.4, 15.6),
        ("t10", "Quizá no necesito", 150, 15.8, 18.6), ("t11", "descansar más.", 250, 16.1, 18.6),
        ("t12", "Quizá esto que cargo", 150, 18.8, 21.8), ("t13", "tiene otra forma,", 250, 19.1, 21.8),
        ("t14", "y todavía", 330, 22.0, None), ("t15", "no tiene nombre.", 430, 22.3, None),
    ]
    tiras_html = "\n".join(
        f'<div id="{i}" class="tira{" k" if i in ("t5", "t9", "t14", "t15") else ""}" style="top:{top}px">{html.escape(t)}</div>'
        for i, t, top, _, _ in tiras)
    cuerpo = f"""
      <div id="fondo" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="0">
        <div id="papel" class="bloque"></div>
        <div id="arco" class="bloque"></div>
        <div id="franja" class="bloque"></div>
        <img id="dA" class="dani" src="assets/r2_cama-lado_ojos-cerrados.png" style="left:120px;top:640px;width:900px" alt="" />
        <img id="dA2" class="dani" src="assets/r2_cama-lado_ojos-abiertos.png" style="left:120px;top:640px;width:900px" alt="" />
        <img id="dB" class="dani" src="assets/r2_borde-cama_hombros-arriba.png" style="left:60px;top:560px;width:860px" alt="" />
        <img id="dB2" class="dani" src="assets/r2_borde-cama_hombros-abajo.png" style="left:60px;top:560px;width:860px" alt="" />
        <img id="dC" class="dani" src="assets/r2_de-pie-taza_ojos-abiertos.png" style="left:230px;top:420px;width:880px" alt="" />
        <div id="pl1" class="pill etq" style="left:640px;top:1760px">sábado · domingo</div>
        <div id="pl2" class="pill etq" style="left:760px;top:1760px">lunes · 07:40</div>
        <div id="pl3" class="pill etq" style="left:700px;top:1760px">funcionando</div>
        <div id="veladura" class="capa"></div>
      </div>
      <div id="textos" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="2">{tiras_html}</div>"""
    js = """
// Entrada en cascada (waterfall) del collage
tl.fromTo("#papel", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0);
tl.fromTo("#arco", { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.12);
tl.fromTo("#franja", { y: 220 }, { y: 0, duration: 0.6, ease: "power3.out" }, 0.25);
tl.fromTo("#dA", { opacity: 0, y: 60, rotation: -3 }, { opacity: 1, y: 0, rotation: -1, duration: 0.9, ease: "back.out(1.3)" }, 0.4);
tl.to("#dA2", { opacity: 1, duration: 0.4 }, 4.0); tl.to("#dA", { opacity: 0, duration: 0.4 }, 4.0);
// Nudge: el bloque sale a la izquierda y el siguiente entra desde la derecha (10/65/25)
function cambio(salen, entra, t) {
  tl.to(salen, { x: -1100, duration: 0.7, ease: "power3.in" }, t);
  tl.fromTo(entra, { opacity: 1, x: 1100 }, { x: 0, duration: 0.8, ease: "power3.out" }, t + 0.45);
}
cambio("#dA, #dA2", "#dB", 6.9);
tl.to("#dB2", { opacity: 1, duration: 0.5 }, 13.6); tl.to("#dB", { opacity: 0, duration: 0.5 }, 13.6);
cambio("#dB, #dB2", "#dC", 15.2);
tl.to("#arco", { backgroundColor: "#D7B18F", duration: 1.2 }, 15.6);
// Etiquetas
tl.fromTo("#pl1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2); tl.to("#pl1", { opacity: 0, duration: 0.3 }, 3.6);
tl.fromTo("#pl2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 4.0); tl.to("#pl2", { opacity: 0, duration: 0.3 }, 7.2);
tl.fromTo("#pl3", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 12.4); tl.to("#pl3", { opacity: 0, duration: 0.3 }, 15.4);
// Tiras de papel con el texto (entran en cascada, levemente giradas)
const tiras = %TIRAS%;
tiras.forEach(([id, ini, fin], i) => {
  const r = (i % 2 ? 1.2 : -1.4);
  tl.fromTo("#" + id, { opacity: 0, x: -40, rotation: r * 2 }, { opacity: 1, x: 0, rotation: r, duration: 0.55, ease: "back.out(1.6)" }, ini);
  if (fin !== null) tl.to("#" + id, { opacity: 0, x: 30, duration: 0.4, ease: "power2.in" }, fin);
});
tl.to("#veladura", { opacity: 0.35, duration: 1.6, ease: "sine.inOut" }, 21.4);
tl.to("#dC", { scale: 1.04, duration: 10, ease: "none" }, 16.0);
""".replace("%TIRAS%", "[" + ",".join(
        f'["{i}", {ini}, {"null" if fin is None else fin}]' for i, _, _, ini, fin in tiras) + "]")
    return pagina("Estilo 4 · Collage editorial", css, cuerpo, js), [
        "r2_cama-lado_ojos-cerrados.png", "r2_cama-lado_ojos-abiertos.png", "r2_borde-cama_hombros-arriba.png",
        "r2_borde-cama_hombros-abajo.png", "r2_de-pie-taza_ojos-abiertos.png"]


# ---------------------------------------------------------------- 5 · Dos ritmos (pantalla dividida)
def dosritmos():
    tareas = ["responder correos", "reunión de equipo", "informe mensual", "llamar al banco", "pagar cuentas",
              "revisar pendientes", "almuerzo en el escritorio", "otra reunión", "supermercado", "mensajes",
              "preparar mañana", "responder correos", "reunión de equipo", "informe mensual", "llamar al banco",
              "pagar cuentas", "revisar pendientes", "mensajes", "preparar mañana", "responder correos"]
    lista = "\n".join(
        f'<div class="tarea" id="ta{i}"><span class="caja"><span class="tick" id="tk{i}"></span></span>{html.escape(t)}</div>'
        for i, t in enumerate(tareas))
    css = """
#arriba { position:absolute; left:0; top:0; width:1080px; height:960px; background:var(--verde); overflow:hidden; }
#lista { position:absolute; left:92px; top:300px; }
.tarea { font-family:"Inter",sans-serif; font-weight:500; font-size:40px; color:#FFFEFE; height:78px; display:flex; align-items:center; gap:26px; opacity:.85; }
.caja { width:38px; height:38px; border:3px solid #FFFEFE; border-radius:8px; position:relative; display:inline-block; }
.tick { position:absolute; inset:5px; background:#EED3BB; border-radius:3px; transform-origin:center; }
#banda { position:absolute; left:0; top:0; width:1080px; height:270px; background:linear-gradient(#3F4A3A 78%, rgba(63,74,58,0)); }
#reloj { position:absolute; right:92px; top:150px; font-family:"Inter",sans-serif; font-weight:500; font-size:64px; color:#EED3BB; letter-spacing:.04em; }
#etqA { position:absolute; left:92px; top:170px; font-size:28px; color:#EED3BB; }
#abajo { position:absolute; left:0; top:960px; width:1080px; height:960px; background:#FFFEFE; overflow:hidden; }
#etqB { position:absolute; left:92px; top:1010px; font-size:28px; color:var(--borgona); }
#dani { position:absolute; left:442px; top:863px; width:618px; }
#luz { position:absolute; left:500px; top:960px; width:700px; height:960px; background: radial-gradient(ellipse 340px 520px at 70% 30%, rgba(255,236,205,.9), rgba(255,236,205,0) 70%); opacity:.5; }
#div { position:absolute; left:0; top:958px; width:1080px; height:4px; background:var(--arena); }
.frase { top:1100px; left:70px; width:520px; font-size:60px; line-height:1.3; }
#veladura { position:absolute; left:0; top:0; width:1080px; height:960px; background:var(--beige); opacity:0; }
#veladura2 { position:absolute; left:0; top:960px; width:1080px; height:960px; background:var(--beige); mix-blend-mode:multiply; opacity:0; }
"""
    pts = [(700, 1120), (820, 1220), (760, 1330), (900, 1180), (650, 1260), (960, 1380), (720, 1450)]
    cuerpo = f"""
      <div id="escena" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="0">
        <div id="arriba"><div id="lista">{lista}</div>
          <div id="banda"></div><div id="etqA" class="etq">afuera · todo avanza</div><div id="reloj">07:40</div></div>
        <div id="veladura"></div>
        <div id="abajo"></div>
        <div id="luz"></div>
        <img id="dani" src="assets/r2_de-pie-taza_ojos-abiertos.png" alt="" />
        {motas("m", pts)}
        <div id="veladura2"></div>
        <div id="etqB" class="etq">adentro · el tiempo no pasa</div>
        <div id="div"></div>
      </div>
{chr(10).join(frase_html(b) for b in BEATS)}"""
    horas = ["07:40", "08:15", "09:00", "09:30", "10:45", "11:20", "12:05", "13:10", "14:00", "15:25", "16:40", "17:15", "18:30", "19:05", "19:58"]
    js = """
// Afuera: la lista corre y se tacha rápido (funcionar)
tl.fromTo("#lista", { y: 0 }, { y: -1100, duration: 14, ease: "none" }, 0.4);
for (let i = 0; i < 20; i++) tl.fromTo("#tk" + i, { scale: 0 }, { scale: 1, duration: 0.18, ease: "back.out(3)" }, 0.6 + i * 0.68);
const horas = %HORAS%;
// Reloj: cada hora es un estado fijo en el tiempo (determinista)
horas.forEach((h, i) => tl.call(() => { document.getElementById("reloj").textContent = h; }, null, i * 0.95));
tl.call(() => { document.getElementById("reloj").textContent = "07:40"; }, null, 0.001);
// "pero no estoy.": afuera se detiene en seco
tl.to("#lista", { opacity: 0.25, duration: 0.6 }, 13.8);
tl.to("#etqA, #reloj", { opacity: 0.3, duration: 0.6 }, 13.8);
// Adentro: Dani quieta, luz que respira, polvo lento, cámara con deriva leve
tl.fromTo("#dani", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 1.4, ease: "power2.out" }, 0.3);
tl.to("#dani", { scale: 1.05, x: -10, duration: 24, ease: "none" }, 1.8);
tl.to("#luz", { opacity: 0.85, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: 9 }, 0.5);
tl.fromTo("#etqB, #etqA", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.2);
polvo("m", 7, 1.0);
// Cierre: arriba se cubre de veladura cálida; abajo baja la luz
tl.to("#veladura", { opacity: 0.92, duration: 1.8, ease: "sine.inOut" }, 15.4);
tl.to("#veladura2", { opacity: 0.32, duration: 1.6, ease: "sine.inOut" }, 21.4);
""".replace("%HORAS%", str(horas)) + frases_js()
    css += "#b8 { color:var(--borgona); top:1100px; }"
    return pagina("Estilo 5 · Dos ritmos", css, cuerpo, js), ["r2_de-pie-taza_ojos-abiertos.png"]


# ---------------------------------------------------------------- 6 · Luz que pasa (cinemático)
def luz():
    css = """
#cam { position:absolute; inset:0; overflow:hidden; }
#escena { position:absolute; inset:0; width:1080px; height:1920px; transform-origin:57% 40%; }
#haz { position:absolute; inset:0; background: rgba(255,226,180,.55); mix-blend-mode:multiply;
       clip-path: polygon(78% 33%, 100% 37%, 100% 62%, 70% 55%); opacity:0; }
#brillo { position:absolute; inset:0; background: radial-gradient(ellipse 500px 700px at 90% 25%, rgba(255,240,215,.9), rgba(255,240,215,0) 70%); mix-blend-mode:screen; opacity:.3; }
.dia { position:absolute; left:92px; top:1760px; font-size:28px; color:var(--borgona); opacity:0; }
#veladura { background:var(--beige); mix-blend-mode:multiply; opacity:0; }
#satura { background:#FFF8EF; mix-blend-mode:saturation; opacity:0; }
#b8 { top:330px; color:var(--borgona); }
"""
    pts = [(780, 420), (880, 560), (720, 640), (960, 720), (820, 860), (700, 520), (930, 980), (770, 1100), (1000, 600)]
    cuerpo = f"""
      <div id="cam" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="0">
        <img id="escena" src="assets/r2e_cama_APROBADA.png" alt="" />
        <div id="haz" class="capa"></div>
        <div id="brillo" class="capa"></div>
        {motas("m", pts)}
        <div id="veladura" class="capa"></div>
        <div id="satura" class="capa"></div>
      </div>
      <div id="dias" class="clip capa" data-start="0" data-duration="{DUR}" data-track-index="1">
        <div id="d1" class="dia etq">sábado</div><div id="d2" class="dia etq">domingo</div><div id="d3" class="dia etq">lunes</div>
      </div>
{chr(10).join(frase_html(b) for b in BEATS)}"""
    js = """
// El fin de semana pasa: la mancha de luz viaja por el piso (sábado → domingo → lunes)
const formas = [
  "polygon(78% 33%, 100% 37%, 100% 62%, 70% 55%)",
  "polygon(66% 40%, 96% 46%, 88% 78%, 50% 66%)",
  "polygon(40% 52%, 76% 58%, 60% 92%, 18% 80%)",
  "polygon(78% 33%, 100% 37%, 100% 62%, 70% 55%)",
];
tl.set("#haz", { clipPath: formas[0] }, 0);
tl.to("#haz", { opacity: 1, duration: 0.8 }, 0.1);
tl.to("#haz", { clipPath: formas[1], duration: 2.3, ease: "sine.inOut" }, 0.3);
tl.to("#haz", { clipPath: formas[2], duration: 2.3, ease: "sine.inOut" }, 2.6);
tl.to("#haz", { opacity: 0, duration: 0.5 }, 4.6);
tl.set("#haz", { clipPath: formas[3] }, 5.1);
tl.to("#haz", { opacity: 0.6, backgroundColor: "rgba(255,240,222,.5)", duration: 1.2 }, 5.2);   // lunes: luz más pálida
["#d1", "#d2", "#d3"].forEach((d, i) => {
  tl.fromTo(d, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2 + i * 2.3);
  tl.to(d, { opacity: 0, duration: 0.4 }, i < 2 ? 2.2 + i * 2.3 : 7.0);
});
// Cámara ligada a la frase: se acerca a Dani en el desarrollo (máx. 1,3×), se aleja un poco en el cierre
tl.fromTo("#escena", { scale: 1.02 }, { scale: 1.08, x: -10, duration: 7.2, ease: "none" }, 0);
tl.to("#escena", { scale: 1.28, x: -40, y: 30, duration: 8.4, ease: "sine.inOut" }, 7.2);
tl.to("#escena", { scale: 1.18, x: -30, y: 135, duration: 10.4, ease: "sine.inOut" }, 15.6);
tl.to("#brillo", { opacity: 0.6, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: 10 }, 0.4);
polvo("m", 9, 0.5);
// Mundo interno y cierre: veladura cálida con baja de saturación (nunca gris)
tl.to("#veladura", { opacity: 0.38, duration: 1.6, ease: "sine.inOut" }, 21.2);
tl.to("#satura", { opacity: 0.3, duration: 1.6, ease: "sine.inOut" }, 21.2);
""" + frases_js()
    return pagina("Estilo 6 · Luz que pasa", css, cuerpo, js), ["@r2e_cama_APROBADA.png"]


ESTILOS = {
    "1-editorial": editorial,
    "2-lineart-se-dibuja": lineart,
    "3-diario": diario,
    "4-collage": collage,
    "5-dos-ritmos": dosritmos,
    "6-luz-que-pasa": luz,
}

PKG = """{
  "name": "%s",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "npx --yes hyperframes@0.9.72 preview",
    "check": "npx --yes hyperframes@0.9.72 check",
    "render": "npx --yes hyperframes@0.9.72 render"
  }
}
"""

if __name__ == "__main__":
    for nombre, fn in ESTILOS.items():
        d = os.path.join(AQUI, nombre)
        os.makedirs(os.path.join(d, "assets", "fonts"), exist_ok=True)
        contenido, imgs = fn()
        with open(os.path.join(d, "index.html"), "w") as f:
            f.write(contenido)
        with open(os.path.join(d, "package.json"), "w") as f:
            f.write(PKG % ("estilo-" + nombre))
        for fu in ("Fraunces-600.woff2", "Inter-500.woff2"):
            shutil.copy(os.path.join(FUENTES, fu), os.path.join(d, "assets", "fonts", fu))
        for im in imgs:
            if im.startswith("@"):
                shutil.copy(os.path.join(REPO, "assets", "dani", "r2", im[1:]), os.path.join(d, "assets", im[1:]))
            else:
                shutil.copy(os.path.join(DANI, im), os.path.join(d, "assets", im))
        print("ok", nombre)
