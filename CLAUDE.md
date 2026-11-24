# Proyecto Daniela · Instagram de psicología clínica fenomenológica

Daniela es psicóloga clínica chilena, con el modelo fenomenológico de Giampiero Arciero (Heidegger y Ricœur). Su cliente ideal es una mujer de 25 a 40 años, profesional. Esta cuenta produce el contenido de su marca en Instagram: Reels animados, Carruseles y Puentes.

Responde siempre en **español**.

## Jerarquía de fuentes (quién manda)
1. **Sentido:** `docs/` → los 4 pilares y el significado de las portadas (Teo es el guardián fenomenológico). Ningún texto ni imagen puede contradecirlos.
2. **Reels:** el Documento maestro de Reels (resumen abajo) y `docs/hoja_personaje_dani.md`.
3. **Guiones validados:** `guiones/reels-2-3-4-validados.md` (los Reels 2, 3 y 4), la hoja de trabajo del Mes 1 y `feed/prompts-flow-feed.md`.
4. **Marca:** paleta, tipografía y reglas absolutas (abajo).

Si un pedido contradice esto, avisa antes de producir. Las frases de cierre siempre pasan por Teo.

## Los 4 pilares (filtro obligatorio)
- **Ansiedad:** tonalidad afectiva, una posición que la experiencia fáctica revela. Se entra por "¿qué estaba pasando cuando apareció?". NO es una señal corporal que escuchar, ni algo fisiológico, ni algo que se gestione.
- **Burnout:** funcionar sin habitarse. No es exceso de trabajo y no se proponen soluciones.
- **Soledad:** un modo de habitar el ser-con. Nunca una mujer sola en pantalla; nunca prometer que comprender libera.
- **Identidad:** acceso a la mismidad. Comprenderse para habitarse; nunca un "nuevo yo".

**Prohibido:**
- Lenguaje: psicología pop, tips o pasos, TCC, mindfulness genérico ("conecta contigo"), coaching, wellness.
- Imágenes: iconografía de salud mental (cerebros, nudos, nubes negras, espejos rotos, máscaras, personas ovilladas), dramatismo o pose de víctima.

Daniela no aparece en las piezas. **@Dani** es un personaje que representa a la mujer del nicho, no a Daniela.

## Reels animados (Remotion · carpeta `video/`)
- **Estructura:**
  - intro de persiana y obturador en blanco y negro (1,7 s; la primera frase entra a los ≈0,9 s);
  - cuerpo de 25-35 s;
  - respiro sin texto;
  - mundo interno;
  - cierre de ≈7 s **sobre la última escena** (sin espiral): la luz baja con una veladura cálida y entra la frase en borgoña.
  - Total: 40-45 s.
- **Texto:**
  - Fraunces 600, 76 px, #1A1A1A, alineado a la izquierda, margen 92 px, top **300 px**, **en el espacio en blanco superior** (la ilustración no llega hasta arriba), ancho 800 px, interlineado 1,4.
  - Entra palabra por palabra (0,12 s entre palabras, 0,65 s de entrada, subida de 18 px) y sale con un fundido de 0,5 s.
  - El cierre va en borgoña #7D4F6A en la misma posición (300 px).
- **Espacio para el texto:** como en el Reel 1, la ilustración no llega hasta arriba; el tercio superior queda en blanco para las letras (no es un marco). Escenas con **planos de profundidad** (primer plano, Dani y fondo) y **cámara siempre en movimiento** (zoom o desplazamiento distinto en cada plano).
- **Herramienta (decisión del 24-11): Remotion** para todas las escenas y fondos (`video/`). El proyecto HyperFrames (`hyperframes/`) queda como referencia.
- **Ritmo:** zooms lentos (máx. 1,10 con texto), cambios de pose de 0,9-1,4 s, fundido de 0,8 s entre escenas; cada escena entra y sale junto con su texto. Ningún dibujo sube de 780 px. La acción debe tener sentido con la frase ("Estoy funcionando" → sirve café).
- **Cámara:** ligada a lo que dice la frase, zoom de 1,3× como máximo, siempre con una deriva leve.
- **Ambiente vivo:** en cada escena hay un objeto siempre en movimiento y, al cambiar de escena, se incorpora otro. Puede ser Dani o un elemento del fondo (cortina, planta, vapor, luz, vela); pueden moverse dos o tres a la vez. El polvo va solo donde hay un haz de sol.
- **Mundo interno:** veladura cálida con baja de saturación. Nunca gris.
- **Fondos (decisión del 24-11): dibujados en Remotion con el estilo del video del Reel 1**: pared blanca fría muy suave (#ECEBE6), líneas finas gris cálido (#6B645D, ≈2 px), muebles blancos, piso de tablas claras (#E4E2DC) y **el sol como protagonista** (haz cálido #FBEBCF en diagonal desde la ventana y manchas claras en el piso). Nivel de detalle: el de la muestra de cocina (`video/src/reel/FondoCocinaDetalle.tsx`). Lo que sigue en este punto quedó como referencia anterior: escenas completas de Flow en **line art blanco con línea negra normal**. Color solo en detalles (madera, marcos de puerta y ventana, una planta), **como máximo el 20 % del fondo**. **Dani siempre a todo color y es la única con detalle**: sábanas, muebles, cortina y piso son planos, con 2 o 3 pliegues como máximo y sin texturas. Siempre hay una ventana con cortina, que muestra solo luz o blanco. 4-6 objetos por escena (como las referencias de `assets/referencias/fondos/`, pero con un 20 % menos de elementos), con línea negra uniforme de ≈3 px. **Color de marca por objeto**: madera #D7B18F, textiles #EED3BB o #F4D5DC, plantas #3F4A3A, cerámica #EED3BB o #F4D5DC; nada de borgoña en los fondos. Control: `python3 tools/medir_fondo.py`. Arriba, la ilustración se disuelve en blanco. Luz: un brillo cálido muy suave. Sombra de contacto mínima. Ángulo según la escena; entre lugares se mantiene el estilo, no la misma casa. Primer plano = un objeto de la propia escena. Referencia aprobada: `assets/dani/r2/r2e_cama_APROBADA.png`. Daniela las genera editando las poses de Dani (`flow/REEL2_ESCENAS_COPIAR_Y_PEGAR.md`). Claude anima encima la cortina, la luz, el vapor y el polvo. Los fondos SVG de `Escena.tsx` quedan solo como respaldo.
- **Dani:**
  - Las imágenes vienen de Flow, solo imágenes, nunca video. Se recortan con `python3 tools/recortar_dani.py assets/dani/rN video/public/dani`.
  - Los gestos se hacen con fundidos entre las poses A y B, que deben estar alineadas.
  - Rostro oficial: `assets/referencias/dani_ROSTRO_OFICIAL.webp`. Es redondo y suave, adulto, con ojos pequeños; no anime.
- **Voz en off:** la voz de Daniela, grabada con el celular (`guiones/GRABAR_VOZ_EN_OFF.md`). Se limpia, se transcribe y las frases en pantalla se sincronizan con la voz.
- **Entrega:** 1080×1920, 30 fps, H.264, **con la voz en off de Daniela** (sin música: la música se agrega en Instagram). Mientras no haya voz, va sin audio. Siempre una versión de 720p para revisión y otra final.
  - Revisión: `cd video && npm run r2:revision`
  - Final: `cd video && npm run r2:final`
- **Prompts de Flow para copiar y pegar:** `flow/`. El agente de Flow va apagado, con Nano Banana 2.1 en 9:16, la variante B se hace editando la imagen A, y siempre se adjunta el rostro oficial.

## Feed
- **Formato:** 1080×1350.
- **Fondos alternados en tablero:** blanco #FFFEFE con detalles, beige #EED3BB y rosado #F4D5DC.
- **@Dani:** en 3 de las 12 portadas como máximo (P1, P6 y P12).
- **Portadas:** versión corta, 8 palabras como máximo.
- **Llamado a la acción:** no se agregan llamados nuevos.
- **Paleta:** #FFFEFE, #EED3BB, #D7B18F, #3F4A3A, #000000, más el acento borgoña #7D4F6A y el rosado #F4D5DC en los fondos de portada.
- **Tipografías:** Fraunces para títulos, Inter para cuerpo y etiquetas.

## Estructura del repositorio
- `docs/`: hoja de personaje y documentos de sentido.
- `estrategia/`: tendencias, ganchos y la plantilla de cuadratura.
- `guiones/`: textos validados y ganchos A/B.
- `reels/rN-*/`: plan de planos de cada Reel.
- `flow/`: prompts de Flow.
- `assets/`: imágenes de Dani y referencias.
- `video/`: proyecto Remotion (`src/reel/` = motor reutilizable; `src/reels/` = un archivo por Reel).
- `salida/`: archivos para publicar.

## Cómo trabajar
- Antes de un texto nuevo, usa `estrategia/cuadratura-guion.md`.
- **Reel nuevo:**
  1. Copia `video/src/reels/Reel2Burnout.tsx`.
  2. Cambia los planos, las frases y las imágenes.
  3. Regístralo en `video/src/Root.tsx`.
  4. Revisa la hoja de contacto de cuadros clave antes de renderizar entero.
- Las skills de Remotion están en `.claude/skills/` (empieza por `remotion-best-practices`).
- Commits en español. No se publica nada en Instagram desde aquí: Daniela publica y agrega la música.
