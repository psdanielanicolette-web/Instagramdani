# HyperFrames · Prompt maestro de los Reels de Dani
*Todo el sistema gráfico de los reels convertido en números, para que HyperFrames lo reproduzca igual que las referencias.*
*Fuentes: el Documento maestro de Reels, el Sistema visual, el Plan de planos del Reel 2, la hoja de personaje, los 4 pilares y el Significado de las 12 portadas (Teo), el Documento de Marca, la Identidad visual, los guiones reformulados con Teo y las decisiones de Daniela en esta sesión. La trazabilidad completa está en la sección 6.*

---

## 1. Cómo se usa
1. Abre Claude Code en este repositorio. Las skills de HyperFrames ya están instaladas en `.claude/skills/`.
2. Copia el **PROMPT** de la sección 2 y cambia solo `[N]` por el número del reel (2, 3 o 4).
3. Claude lee este archivo, escribe el `SPEC.md` del reel, arma la composición y te muestra la vista previa antes de renderizar.

**Requisito:** las imágenes de la escena de ese reel (de Flow, en line art) tienen que estar en `assets/dani/rN/`, con los nombres de la ficha.

---

## 2. PROMPT (copiar y pegar)
```
/hyperframes
Construye el Reel [N] de Dani como un proyecto HyperFrames en la carpeta hyperframes/reel[N]/.

Fuentes obligatorias, en este orden:
1) hyperframes/PROMPT_MAESTRO_REELS.md (SPEC de la serie, la sección 3, y los planos del reel, la sección 4): copia sus números tal cual, no los reinterpretes.
2) fichas/FICHA_GUION_REELS_MES1.md (guion validado por Teo: no cambies ni una palabra).
3) docs/hoja_personaje_dani.md y CLAUDE.md.

Reglas:
- Escribe primero hyperframes/reel[N]/SPEC.md copiando la sección 3 y la tabla de planos del reel. Muéstramelo antes de construir.
- No propongas tres storylines: la historia ya está decidida en la ficha.
- HyperFrames es la herramienta principal. Usa Remotion (carpeta video/) SOLO si una función sale claramente mejor ahí, y avísame antes.
- Usa SOLO las imágenes de assets/dani/r[N]/ para Dani y la escena. No dibujes ni generes a Dani. Los fondos ya vienen en las imágenes.
- Lo que está en "PERMITIDO POR LA MARCA" (sección 3) NO es un default prohibido: es la identidad de la marca.
- Sin música ni efectos de sonido. El único audio es la voz en off de Daniela, cuando exista (assets/voz/r[N].*). Si no existe, el video va sin audio.
- Cuando termines, corre npx hyperframes check --json y snapshot --review, revisa la QA de la sección 3 y muéstrame la vista previa. No renderices hasta que yo apruebe.
```

---

## 3. SPEC de la serie (igual en todos los reels)
> **Qué se toma del Reel 1 como referencia:** el espacio en blanco superior para el texto, la intro y **una escena viva, con planos y cámara en movimiento**.
> **Qué NO se copia tal cual:** la forma de dar vida a la escena. El polvo en la luz era propio de esa escena. Cada escena elige sus propios elementos vivos (sección AMBIENTE VIVO).

```text
GOAL:    que la mujer de 25-40 se reconozca en un instante cotidiano ("esto me pasa a mí")
         y quede con una pregunta abierta, no con una solución.
OUTPUT:  HyperFrames, 1080 x 1920, 30 fps, vertical (Instagram Reels).
TIME:    40-45 s = 1200-1350 frames. Sin BPM (no hay música).

LOOK (el medio: ilustración editorial a línea sobre papel blanco + personaje a color)
  ESPACIO PARA EL TEXTO (como en el Reel 1; NO es un marco):
           la ilustración NO llega hasta arriba. La escena ocupa todo el ancho y llega hasta el
           borde inferior; la parte superior del cuadro (≈ el tercio superior, hasta y ≈ 640 px)
           queda en blanco o como pared vacía de la propia escena, y ahí van las letras.
           Las imágenes de Flow ya traen ese tercio superior despejado ("The upper third of
           the frame is empty white wall"). La cámara puede moverse sobre toda la imagen,
           pero esa franja superior siempre queda vacía: ningún objeto, línea fuerte ni la
           cabeza de Dani entra en ella. El texto es una capa fija, fuera de la cámara.
  ground:  el fondo de escena viene en las imágenes de Flow: line art negro de LÍNEA NORMAL
           (grosor regular y uniforme, ni fino ni grueso) sobre blanco; color solo en madera,
           marcos y planta, como máximo el 20 % del fondo. Sin degradados ni texturas.
  PLANOS:  cada escena tiene profundidad en capas: primer plano (un objeto cercano, por ejemplo
           el borde de la mesa o la cortina), plano medio (Dani) y fondo (pared y ventana).
           Las capas se separan (recorte) y se mueven a distinta velocidad con la cámara
           (parallax: primer plano ×1,15, Dani ×1,0, fondo ×0,9).
  ink:     line art #2D2825 (negro cálido); texto #1A1A1A.
  accent:  borgoña #7D4F6A → SOLO en la frase de cierre. En ningún otro lugar.
  detalle: beige #EED3BB y madera #CA9B76 / #DFB593, solo como detalle mínimo.
  persona: Dani a todo color y la única con detalle (piel #ECBFA8, pelo #5A3040).
  display: Fraunces 600, 76 px, tracking 0, interlineado 1.4, color #1A1A1A,
           alineado a la izquierda, x = 92 px, primera línea en y = 300 px, ancho máx. 800 px,
           siempre sobre el espacio en blanco superior, nunca encima de la ilustración.
           Cierre: la misma fuente y la misma posición (y = 300 px), en borgoña.
           (archivo: assets/fonts/Fraunces-600.woff2 con @font-face)
  body:    Inter 500 (solo si hubiera etiquetas; en el reel no hay).
  luz:     ventana a la DERECHA. Haz cálido #FFF4E2 en multiply, opacidad 0.55-0.70,
           desenfoque 18 px. Sin viñeta. Sin grano. Sin glow.

DANI (hoja de personaje)
  - Mujer de ~35 años que representa a la mujer del nicho. NO es Daniela.
  - Rostro oficial: assets/referencias/dani_ROSTRO_OFICIAL.webp (redondo y suave, adulto, ojos
    pequeños sin brillo, cejas de una línea, nariz de un trazo, boca corta, piel plana sin rubor).
    No anime. Pelo largo ondulado borgoña oscuro #5A3040, hasta media espalda.
  - Emoción contenida: quietud con algo por debajo. Nunca drama, llanto, víctima ni sexualización.
  - Cabeza de perfil o en 3/4, sin giros. Movimiento lento.
  - Gestos de la serie: mano al pecho (insignia), ojos que se cierran o abren despacio, hombros que
    caen al exhalar, manos quietas en las rodillas o alrededor de una taza, mirada fija y ausente.
  - Ropa por reel (no cambia dentro del reel): R1 suéter oliva, jeans y zapatillas negras · R2 pijama
    crema y luego camisa de lino beige con pantalón negro · R3 suéter de punto beige · R4 ropa base.
  - Otras personas: el mismo estilo, rostro mínimo, de espaldas o parcialmente fuera de cuadro.

OBJECTS (lo que debe reconocerse sin rótulo)
  - Dani (personaje, ~35 años, rostro redondo y suave, adulto, ojos pequeños, pelo largo
    ondulado borgoña). Siempre de perfil o en 3/4. Nunca giros de cabeza.
  - La ventana con cortina de lino (está en todas las escenas): es la fuente de luz y se mueve.
  - El objeto de cada plano (cama, taza, jarra, mesa, vela, agenda) según la ficha.

MOTION (curvas por rol; duraciones en frames a 30 fps)
  texto entra:   palabra por palabra · stagger 0,12 s (≈4 f) · cada palabra 0,65 s (≈20 f)
                 · opacity 0→1 + y +18 px→0 · ease power3.out.
  texto sale:    opacity 1→0 en 0,5 s (15 f) · power1.in. El texto NO se mueve mientras se lee.
  texto dura:    ≈3 s por frase (90 f), el cierre se sostiene hasta el final.
  cámara:        ES CLAVE: la escena nunca está quieta. Zoom de acercamiento o alejamiento, o
                 desplazamiento, en CADA plano, distinto del plano anterior. Una transformación
                 (scale + x/y) sobre las capas de la escena; el texto queda fuera de la cámara.
                 Zoom máximo 1,30. Ease power2.inOut. Movimientos
                 de 3-6 s. Deriva leve permanente: x = 6·sin(0,7·t), y = 3,6·cos(0,53·t) px.
                 Nunca un corte de zoom ni un salto.
  cámara ligada a la frase (Documento maestro):
                 tiempo, lugar o situación → plano general con deriva suave hacia la luz o el espacio ·
                 lo quieto o en orden → se acerca a los objetos en reposo ·
                 una parte del cuerpo → se acerca a esa parte y se queda ·
                 el mundo de afuera o la rutina → se abre y se aleja hacia la ventana o el entorno ·
                 ausencia, "no estar" → se aleja despacio y Dani queda pequeña ·
                 lo interno → sube lentamente al rostro.
  sincronía:     la frase que nombra un gesto entra JUSTO cuando Dani lo hace
                 (si dice "pecho", la mano va al pecho).
  respiro:       al menos un pasaje de 2-5 s sin texto entre las dos mitades del guion.
  cambio de pose A→B: fundido cruzado entre imágenes alineadas · 0,5 s (15 f) · sine.inOut
                 (hombros o exhalación: 0,9 s).
  respiración:   escala Y de Dani 1 → 1,0045 → 1 · período 4,2 s · origen en los pies.
  cortes:        corte seco en la acción (abrir los ojos, la taza que se llena);
                 fundido de 0,4 s (12 f) solo al cambiar de lugar.

AMBIENTE VIVO (regla de Daniela)
  regla:        en cada escena hay UN objeto que permanece en movimiento todo el tiempo, y
                AL CAMBIAR DE ESCENA se incorpora otro. Puede ser Dani (respira, parpadea, cambia
                de pose) o un elemento del fondo cuando Dani está quieta. Pueden moverse dos o tres a la vez.
                Se eligen los elementos que tengan sentido en ESA escena (catálogo abajo); no se repite
                el mismo recurso en todas.
  catálogo (todo en función del tiempo, con semilla fija):
    cortina:      ondulación senoidal de 6-10 px, período 5 s, mayor abajo que arriba (anclada en la barra).
    planta:       las hojas se mecen ±2-3°, período 4-6 s, desfasadas entre hojas.
    vapor:        3 trazos de line art #2D2825, 1,6 px, alto 70 px, en curva de S, suben y se desvanecen
                  (opacidad máx. 0,55), ciclo de 2,2 s, desfasados un tercio. A Flow se le pide "no steam".
    luz:          un haz cálido #FFF4E2 en multiply que respira ×(1 + 0,05·sin(2π·t/6,5)) o viaja
                  (−260 px en 6 s) para mostrar el paso del tiempo.
    llama de vela: titila en escala 0,92-1,06 y ±1,5° con ruido de semilla fija.
    polvo:        SOLO donde hay un haz de sol visible (como en el Reel 1): 40-85 partículas dentro del haz.
    Dani:         respiración (escala Y 1→1,0045, 4,2 s), parpadeo o cambio de pose A→B.
  mundo interno: al nombrar lo interno, una capa #EBDDCB en multiply sube a 0,55 de opacidad
                en 1,6 s, y la saturación de Dani baja un 18 %. NUNCA gris: no bajar el brillo sobre blanco.

ESTRUCTURA (frames)
  intro 0-51 (1,7 s): PERSIANA + OBTURADOR en blanco y negro, encima del primer plano ya en movimiento.
    - persiana: láminas #FCFBF9 con línea #2D2825 de 1,4 px; 15 láminas arriba y 12 abajo;
      3 cuerdas verticales (x = 12 %, 40 %, 72 %); cordón con borla a la izquierda (x = 6 %).
    - 0,12 s: se abre desde el centro (la mitad de arriba sube, la de abajo baja; las láminas
      se aprietan contra el borde) · power3.inOut · termina de recogerse a 1,25 s.
    - 0,28 s: aparece en el hueco el OBTURADOR cerrado de 8 hojas (blanco con bordes de línea).
    - 0,50-1,05 s: el obturador se abre (gira 40°) y revela la escena.
    - la escena revelada es EXACTAMENTE el primer cuadro del cuerpo: no hay cambio de gráfica.
    - la primera frase entra a los 0,9 s.
  cuerpo: planos de la ficha (sección 4), con un respiro de 2-5 s sin texto.
  mundo interno: 4-6 s antes del cierre.
  cierre (≈7 s): SOBRE la última escena (sin espiral). Una capa #E9DCCB en multiply a 0,35
    + una capa blanca a 0,18 en 1,2 s; la frase de cierre en borgoña entra 0,8 s después.

PERMITIDO POR LA MARCA (no son defaults: son la identidad)
  - fondo blanco cálido con display serif (Fraunces): es la tipografía de la marca.
  - texto que entra palabra por palabra subiendo 18 px.
  - elementos vivos reales de la escena (cortina, planta, vapor, luz, vela): nunca decorativos.
  - frame 0 en blanco con la persiana: es la firma de apertura aprobada; la portada se hace aparte.

ENTREGA
  - 1080 x 1920, 30 fps, H.264. Dos archivos: uno de revisión en 720p y uno final.
  - Audio: solo la voz en off de Daniela, limpia y sincronizada (las frases entran cuando ella las dice).
    Sin voz grabada, el video va sin pista de audio. La música la agrega Daniela en Instagram.
  - La portada NO se hace aquí: se diseña aparte, en el lienzo del feed.

BANNED (además de los defaults de HyperFrames)
  - música, efectos de sonido, subtítulos automáticos quemados.
  - cualquier color fuera de la paleta; borgoña fuera de la frase de cierre.
  - gris u oscurecer la escena; viñeta, glow, bloom, flares, grano.
  - dibujar, regenerar o deformar a Dani; giros de cabeza; gestos bruscos; risa abierta; llanto.
  - texto centrado; texto que se mueve mientras se lee; tamaños de texto distintos a 76 px.
  - zoom > 1,30; el mismo movimiento de cámara en dos frases seguidas.
  - DESCARTADOS en la producción del Reel 1 (no repetir): la espiral del cierre; la sombra de hojas
    en la pared (se veía pegada); el zoom parecido en todas las frases; la intro larga con la ventana vista
    desde afuera; la intro con beige o borgoña; el obturador que corta la persiana; el punto borgoña;
    el texto pequeño en una segunda frase; las imágenes en GIF.
  - iconografía de salud mental (cerebros, nudos, nubes negras, espejos rotos, máscaras,
    personas ovilladas); una mujer sola en el Reel de Soledad.
  - llamados a la acción, logos, etiquetas, bordes de marco.

QA (cuadros que hay que revisar)
  f 0, 9, 15, 21, 27, 51    → la secuencia de persiana y obturador y la entrada de la 1.ª frase.
  cada cambio de plano       → el corte o fundido es limpio y la pose A→B no muestra "fantasma".
  el respiro                 → no hay texto y algo se mueve.
  el mundo interno           → es cálido, no gris.
  el cierre                  → sin espiral; borgoña solo en la frase; la escena sigue debajo.
  todos                      → texto a 76 px, a la izquierda, en y = 300, sobre el espacio en
                               blanco superior; ninguna parte de la ilustración bajo el texto; cada plano con movimiento de cámara; un objeto
                               siempre en movimiento y otro nuevo al cambiar de escena; duración de 40-45 s.
```

---

## 3b. Molde del Reel 1 (de `docs/plantilla_ilustracion_reel1.md`)
Lo que se replica en cada reel, adaptado a HyperFrames:
- **Kit por lugar:** una **Imagen A** (escena base) y una **Imagen B** (el gesto), con la misma escena y la misma ropa, más una **Imagen C** opcional para el **respiro** (un primer plano distinto, por ejemplo los ojos cerrados). En el Reel 1 ese primer plano fue el pasaje más fuerte.
- **Composición:** tercio superior en blanco para el texto; Dani en los dos tercios inferiores; la ventana y su luz a un lado; **un objeto de apoyo vivo** (la taza con vapor, la cortina, la planta).
- **Ritmo del texto (medido en el Reel 1):** cada frase dura entre 2,2 y 3,6 s en pantalla, con 0,2-0,3 s entre una frase y la siguiente; el respiro dura alrededor de 4 s.
- **Patrón de cámara del Reel 1** (una escena, 9 frases): general con deriva → se acerca al objeto → al cuerpo (1,3×) → se queda → *respiro con otro plano* → se abre a la ventana → leve acercamiento → al cuerpo → sube al rostro mientras la luz baja. Nunca dos frases seguidas con el mismo movimiento.
- **Lo que NO viene de Flow y hace el código:** el ambiente vivo, la intro, el texto y la cámara.
- **Cambios respecto del Reel 1:** el fondo pasa de crema pintado a line art blanco; el cierre ya no tiene espiral; el texto baja a y = 300, en el espacio en blanco superior; el polvo deja de ser obligatorio.

## 4. Planos por reel (para el bloque SHOTS del SPEC)

> **Sentido por reel (pilares de Teo):**
> - **R2 Burnout:** funcionar sin habitarse; no se proponen soluciones. Polo visual: ausencia (todo se mueve menos ella).
> - **R3 Soledad:** la distancia dentro de la compañía; nunca sola; no se promete liberación.
> - **R4 Identidad:** lo propio que dejó de tener dónde mostrarse; nunca un "nuevo yo". Movimiento rápido al enumerar y quietud en la pausa.
> - **Frases de cierre:** validadas por Teo el 20-11. No se cambian.

### Reel 2 · Burnout · imágenes en `assets/dani/r2/` (escenas `r2e_*`)
| Frames | Plano | Frase en pantalla (aparece → sale) | Imagen A→B | Cámara (centro x,y · zoom) | Vivo |
|---|---|---|---|---|---|
| 0-372 | 1-2 Cama | "Dormí todo el fin de semana." 0,9→5,7 s · "Llegó el lunes" 6,7→9,0 · "y amanecí igual de vacía." 9,2→12,3 | cama: ojos cerrados → entreabiertos (7,7 s) → abiertos (9,0 s) | (560,980) 1,00 → (600,940) 1,06 a 6 s → (686,700) 1,30 a 12,4 s | **siempre:** cortina · **entra:** Dani respira; la luz viaja sobre la cama · "apagón" de luz de 5,8 a 6,7 s |
| 372-564 | 3 Borde de la cama | "No es sueño atrasado." 12,7→15,5 · "Dormir no lo repone." 15,7→18,7 | hombros arriba → caídos (15,8 s, 0,9 s) | (540,1000) 1,0 → (490,1250) 1,25 | **siempre:** cortina · **entra:** Dani exhala (A→B) y la planta del alféizar |
| 564-708 | 4 Cocina | "Estoy funcionando —" 19,1→23,4 | jarra arriba → sirviendo (21,2 s) | (560,1000) 1,05 → (740,1110) 1,22 | **siempre:** cortina de la cocina · **entra:** la jarra (A→B) y el vapor desde 21,8 s |
| 708-780 | 5 Taza (respiro) | — | jarra sirviendo | fija en (800,1150) 1,30, deriva 2 px | **siempre:** el vapor (lo único que se mueve) |
| 780-930 | 6 Cocina amplia | "pero no estoy." 26,7→30,8 | cocina vacía + Dani de pie con taza a escala 0,62 | (360,840) 1,28 → (540,960) 1,0 (se aleja) | **siempre:** el vapor · **entra:** cortina de la cocina amplia; fundido de 0,4 s al salir |
| 930-1332 | 7 Ventana + cierre | "Quizá no necesito descansar más." 31,4→34,3 · "Quizá esto que cargo tiene otra forma," 34,5→37,4 · CIERRE "y todavía no tiene nombre." desde 38,4 s | ventana: ojos abiertos → párpados pesados (35 s) | (540,1000) 1,0 → (440,720) 1,25 → 1,28 | **siempre:** cortina · **entra:** Dani (párpados A→B), vapor de la taza; mundo interno desde 31,4 s |

### Reel 3 · Soledad · imágenes en `assets/dani/r3/`
| Frames | Plano | Frase | Imagen A→B | Cámara | Vivo |
|---|---|---|---|---|---|
| 0-180 | 1 La mesa | "En la mesa todos hablan." | mesa con amigas | general, deriva hacia la lámpara | vela que titila, polvo cálido |
| 180-360 | 2 La risa | "Me río en el momento justo —" | ríe → la risa se suaviza | se acerca al rostro | las amigas ríen |
| 360-480 | 3 La mirada | "pero no estoy ahí." | sonrisa → mirada fuera del grupo | se queda en el rostro | las amigas desenfocadas |
| 480-570 | 4 Manos (respiro) | — | su mano quieta | fija | la vela |
| 570-870 | 5 Desde el umbral | "Estoy rodeada de gente," · "pero me siento sola." | grupo desde la puerta | se aleja hasta el umbral | vela, luz que respira |
| 870-1320 | 6 Entre ellas + cierre | "Vivo una distancia que nadie ve." · "Quizá no es que sea extraña." · "Quizá esta distancia tiene una forma," · CIERRE "y todavía no tiene nombre." | una amiga le toca el brazo; la sonrisa queda y la mirada se va lejos | sube al rostro | mundo interno, vela, cortina |
Ropa: suéter de punto beige. Noche: luz cálida de lámpara (en vez de ventana) y la ventana con cortina de fondo.

### Reel 4 · Identidad · imágenes en `assets/dani/r4/`
| Frames | Plano | Frase | Imagen A→B | Cámara | Vivo |
|---|---|---|---|---|---|
| 0-180 | 1 El café | "Me preguntan qué quiero yo." | la amiga pregunta | general, deriva a la ventana | vapor en 2 tazas, polvo, cortina |
| 180-420 | 2 La lista | "Y respondo con la lista" · "de lo que tengo que hacer para cumplir." | 2 dedos → 4 dedos | a las manos | vapor |
| 420-660 | 3 Lo de todos | "No es que no sepa responder." · "Respondo rápido," · "con la lista de todos, menos la mía." | gira el teléfono boca abajo | a los objetos; se detiene en "menos la mía" | luz que viaja sobre la mesa |
| 660-780 | 4 La pausa (respiro) | — | boca entreabierta → silencio, mirada a la taza | fija | **siempre:** el vapor (lo único que se mueve) |
| 780-930 | 5 La pregunta | "Quizá no es que no sepa qué quiero." | mirada en la taza | sube al rostro | vapor, polvo |
| 930-1350 | 6 Ventana + cierre | "Quizá hay un espacio" · "entre eso que quiero y yo —" · CIERRE "y ese espacio todavía no tiene nombre." | mira por la ventana | en el rostro | mundo interno, polvo, cortina |
Ropa: suéter oliva, jeans y zapatillas negras.

---

## 5. Decisiones abiertas antes de construir
0. ⏳ **Movimiento de Dani:** en el Reel 1, Dani se movía con clips de video de Flow (respirar, parpadear, llevar la mano al pecho). En HyperFrames, sin video, los gestos son fundidos entre la Imagen A y la Imagen B. Si un gesto amplio no convence, ese clip se puede generar en Flow (Inicio = A, Fin = B) y usarlo como `<video>` dentro de HyperFrames.
1. ✅ **Texto en y = 300 px** (decisión del 21-11), en el espacio en blanco superior, donde la ilustración no llega (como en el Reel 1).
2. **Voz en off:** cuando llegue, los tiempos de las frases se ajustan a la voz (la transcripción da las marcas de tiempo).
3. **Telemetría:** la skill de HyperFrames envía un aviso de uso anónimo al empezar (se puede desactivar).
4. **Remotion o HyperFrames:** el Reel 2 ya existe en Remotion (`video/`). Con la skill `remotion-to-hyperframes` se puede portar y comparar cuadro a cuadro.

---

## 6. Trazabilidad: cada indicación y de dónde viene
| Indicación | Fuente |
|---|---|
| Función del reel (alcance, "esto me pasa a mí", destello del eje) | Documento maestro §1 · Significado de las 12 portadas |
| Pilares y prohibiciones de lenguaje e imagen | 4 pilares (Teo) · Documento de Marca · Significado de las 12 portadas |
| Guion, voz en off y frases de cierre | Guiones reformulados con Teo (20-11) |
| Primera persona, frases de 8 palabras como máximo, cierre que abre | Documento maestro §3 · decisión de Daniela |
| Estructura (intro, cuerpo, respiro, mundo interno, cierre), 40-45 s | Documento maestro §4 |
| Persiana y obturador en blanco y negro, con sus tiempos | Documento maestro §5 · Sistema visual §6 · storyboard de la intro |
| La primera frase entra a los 0,9 s | Decisión de Daniela (20-11) |
| Planos: una escena o varios planos, corte en la acción, fundido de 0,4 s, sincronía gesto-frase | Documento maestro §6 · Plan de planos del Reel 2 |
| Cámara ligada a la frase, zoom de 1,3× como máximo, deriva | Documento maestro §7 · Sistema visual §3 |
| Cámara siempre en movimiento y planos de profundidad | Decisión de Daniela (21-11) |
| Ambiente vivo: un objeto siempre en movimiento y otro al cambiar de escena; polvo solo con haz de sol | Documento maestro §8 · decisión de Daniela (21-11) |
| Mundo interno cálido, nunca gris | Documento maestro §9 · ajuste de la sesión (v1) |
| Texto en Fraunces 600 de 76 px, palabra por palabra | Documento maestro §10 · Sistema visual §2 |
| Texto a 300 px, en el espacio en blanco superior (la ilustración no llega arriba) | Decisión de Daniela (21-11) · Plantilla del Reel 1 §3 |
| Cierre sobre la escena, sin espiral | Decisión de Daniela (20-11) |
| Fondo de line art con línea normal, color ≤ 20 %, superficies planas, solo Dani con detalle, siempre una ventana con cortina | Decisiones de Daniela (20-11 y 21-11) · Identidad visual (paleta y trazo uniforme) |
| Dani: rostro, pelo, gestos, ropa por reel, otras personas | Hoja de personaje · rostro oficial elegido (20-11) |
| Voz en off de Daniela, sin música | Decisión de Daniela (20-11) · Documento maestro §13 (actualizado) |
| Sin llamados a la acción nuevos | Decisión de Daniela (20-11) |
| HyperFrames primero, Remotion solo si conviene | Decisión de Daniela (21-11) |
| Lo descartado | Documento maestro §18 · Sistema visual |
