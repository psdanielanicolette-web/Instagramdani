# Flow · Reel 2 · Escenas completas (estilo Reel 1) · copiar y pegar

Cada escena se arma **editando la imagen de Dani que ya tienes** y agregándole el fondo, para que ella no cambie. Después, sobre esa escena terminada, editas la variante B.

## Antes de empezar
- **Agente APAGADO.** Modelo **Nano Banana 2.1**, formato **9:16**, solo **imagen**.
- **Adjunta con "+"** la escena del Reel 1 (`assets/referencias/r1_escena_sentada_mano-pecho.jpg`) como **referencia de Dani y de la luz**; el fondo debe ser MÁS blanco que en el Reel 1 (line art). Si el rostro cambia, adjunta también `dani_ROSTRO_OFICIAL.webp`.
- **Orden:**
  1. Abre la imagen A.
  2. Edítala con el prompt "ESCENA" y revisa el resultado.
  3. Sobre esa escena, edita con el prompt "B".
- Descarga en la máxima calidad que ofrezca Flow.

> **Regla del estilo de fondo (Daniela, 20-11):**
> - **Line art blanco con líneas negras.** El fondo es casi todo blanco.
> - **Color solo en algunos detalles** (madera, marcos de puerta y ventana, una planta): **como máximo el 20 % del fondo**.
> - **Dani siempre va a todo color.**
> - **Superficies simples:** sábanas, cortina, muebles y piso planos, con 2 o 3 pliegues como máximo, sin texturas ni vetas. **Solo Dani lleva el detalle.**
> - **Referencias de estilo de fondo:** `assets/referencias/fondos/` (ref_balcon, ref_cocina, ref_calle), con un **20 % menos de elementos**. Línea negra uniforme de ≈3 px a 1080, como un libro para colorear limpio.
> - **Color de marca por objeto** (planos, sin sombra, como máximo el 20 % del fondo): madera → #D7B18F · textiles → #EED3BB o #F4D5DC · plantas → #3F4A3A · cerámica → #EED3BB o #F4D5DC. El borgoña no va en los fondos (es solo de la frase de cierre).
> - **Control:** `python3 tools/medir_fondo.py escena.png` mide el color (≤ 20 %), la densidad (≈ 6-8 %), el grosor (≈ 3 px) y el tercio superior.
> - **Fondo:** 4-6 objetos (mueble principal, ventana con cortina y 2-3 detalles), como la cama aprobada (`assets/dani/r2/r2e_cama_APROBADA.png`). La ventana muestra solo luz o blanco. Sombra de contacto mínima. La parte de arriba se disuelve en blanco. Ángulo según la escena. Entre lugares se mantiene el estilo, no la misma casa.
> - **Siempre hay una ventana con cortina de lino**, porque Claude anima la cortina y la luz.

---

## Arreglo rápido para una escena que salió con mucho detalle
Edita la escena con:
```
Keep @Dani exactly the same — face, hair, pajamas or clothes, pose, position, full detail and color. Simplify everything else: make the bed, sheets, pillows, furniture, curtain and floor flat white shapes with clean thin outlines and only two or three simple fold lines; remove textures, hatching, wood grain, fabric detail and the rug. Keep the window, the curtain and the framing.
```

---

## ESCENA 1 · Dormitorio visto desde arriba (planos 1 y 2)
**Partes de:** `r2_cama-lado_ojos-cerrados.png`

**ESCENA** (edita la imagen A):
```
Keep @Dani and the bed exactly the same — face, hair, pajamas, pose, position and size,  Replace the plain background with a very simple bedroom seen from above: only a few thin floor lines and a window on the right side with a sheer linen curtain; soft afternoon light comes through the window, suggested by a few thin diagonal lines across the floor. SIMPLE SURFACES: the bed, sheets, pillows, furniture, curtain and floor are drawn very simply — flat white shapes with clean outlines and only two or three simple fold lines, no texture, no hatching, no wood grain, no fabric detail, no rug. Only @Dani keeps her full detail and color. BACKGROUND DENSITY: a cozy, readable scene like a coloring-book page but about 20% less busy: 4 to 6 objects in total (the main furniture, the window with its curtain and two or three small details), lots of empty white space. The window shows only soft light or white, no outside view. Only a minimal soft contact shadow under furniture and feet. The top of the illustration fades softly into white, with no visible edge. BACKGROUND STYLE: white line-art illustration — clean thin black ink lines on a white background; the background is mostly pure white and uncolored. LINE: uniform medium black outline, like a clean coloring-book illustration, rounded line ends, no hatching. COLOR: only some objects get flat brand colors, no shading: wood (furniture, window and door frames) #D7B18F; textiles (curtain, cushions, blanket, towel) #EED3BB or #F4D5DC; plants #3F4A3A; ceramics (cups, jars, pots) #EED3BB or #F4D5DC. Everything else stays white. Color covers no more than 20% of the background. No colored walls, no colored floor fills, no painted gradients. Light from the window is suggested with a very soft, almost white warm glow. @Dani stays in full color, exactly as in the original image. The upper third of the frame is empty white floor. No text, no steam.
```
**B · ojos entreabiertos** (edita la ESCENA):
```
Keep everything exactly the same — scene, light, bed, framing, face shape, hair — but her eyes are half open, heavy, waking up.
```
**C · ojos abiertos** (edita la ESCENA):
```
Keep everything exactly the same — scene, light, bed, framing, face shape, hair — but her eyes are open, gazing at nothing, calm and empty, not sad.
```
Archivos: `r2e_cama_ojos-cerrados.png` · `r2e_cama_ojos-entreabiertos.png` · `r2e_cama_ojos-abiertos.png`

---

## ESCENA 2 · Borde de la cama, de lado (plano 3)
**Partes de:** `r2_borde-cama_hombros-arriba.png`

**ESCENA:**
```
Keep @Dani and the bed exactly the same — face, hair, beige linen shirt, black trousers, pose, position and size. Replace the plain background with a very simple bedroom seen from the side: a white wall, one thin floor line, and a tall window on the right with a sheer linen curtain; soft morning light enters, suggested by a few thin diagonal lines. SIMPLE SURFACES: the bed, sheets, pillows, furniture, curtain and floor are drawn very simply — flat white shapes with clean outlines and only two or three simple fold lines, no texture, no hatching, no wood grain, no fabric detail, no rug. Only @Dani keeps her full detail and color. BACKGROUND DENSITY: a cozy, readable scene like a coloring-book page but about 20% less busy: 4 to 6 objects in total (the main furniture, the window with its curtain and two or three small details), lots of empty white space. The window shows only soft light or white, no outside view. Only a minimal soft contact shadow under furniture and feet. The top of the illustration fades softly into white, with no visible edge. BACKGROUND STYLE: white line-art illustration — clean thin black ink lines on a white background; the background is mostly pure white and uncolored. LINE: uniform medium black outline, like a clean coloring-book illustration, rounded line ends, no hatching. COLOR: only some objects get flat brand colors, no shading: wood (furniture, window and door frames) #D7B18F; textiles (curtain, cushions, blanket, towel) #EED3BB or #F4D5DC; plants #3F4A3A; ceramics (cups, jars, pots) #EED3BB or #F4D5DC. Everything else stays white. Color covers no more than 20% of the background. No colored walls, no colored floor fills, no painted gradients. Light from the window is suggested with a very soft, almost white warm glow. @Dani stays in full color, exactly as in the original image. The upper third of the frame is empty white wall. No text, no steam.
```
**B · hombros caídos** (edita la ESCENA):
```
Keep everything exactly the same — scene, light, bed, framing, face, hair, clothes — but her shoulders have dropped gently, as after a long exhale.
```
Archivos: `r2e_borde-cama_hombros-arriba.png` · `r2e_borde-cama_hombros-abajo.png`

---

## ESCENA 3 · Cocina (planos 4 y 5)
**Partes de:** `r2_cocina_jarra-arriba.png`

**ESCENA:**
```
Keep @Dani, the coffee pot, the cup and the wooden counter exactly the same — face, hair, clothes, pose, position and size. Replace the plain wall with a very simple kitchen: a white wall and a window on the right above the counter with a sheer linen curtain; soft morning light, suggested by a few thin diagonal lines. Redraw the floor as thin lines on white. SIMPLE SURFACES: the bed, sheets, pillows, furniture, curtain and floor are drawn very simply — flat white shapes with clean outlines and only two or three simple fold lines, no texture, no hatching, no wood grain, no fabric detail, no rug. Only @Dani keeps her full detail and color. BACKGROUND DENSITY: a cozy, readable scene like a coloring-book page but about 20% less busy: 4 to 6 objects in total (the main furniture, the window with its curtain and two or three small details), lots of empty white space. The window shows only soft light or white, no outside view. Only a minimal soft contact shadow under furniture and feet. The top of the illustration fades softly into white, with no visible edge. BACKGROUND STYLE: white line-art illustration — clean thin black ink lines on a white background; the background is mostly pure white and uncolored. LINE: uniform medium black outline, like a clean coloring-book illustration, rounded line ends, no hatching. COLOR: only some objects get flat brand colors, no shading: wood (furniture, window and door frames) #D7B18F; textiles (curtain, cushions, blanket, towel) #EED3BB or #F4D5DC; plants #3F4A3A; ceramics (cups, jars, pots) #EED3BB or #F4D5DC. Everything else stays white. Color covers no more than 20% of the background. No colored walls, no colored floor fills, no painted gradients. Light from the window is suggested with a very soft, almost white warm glow. @Dani stays in full color, exactly as in the original image. The upper third of the frame is empty white wall. No text, no steam.
```
**B · jarra inclinada** (edita la ESCENA):
```
Keep everything exactly the same — scene, light, counter, framing, face, hair, clothes — but the coffee pot is now tilted, pouring coffee into the cup, which is almost full. Her face does not change.
```
Archivos: `r2e_cocina_jarra-arriba.png` · `r2e_cocina_jarra-inclinada.png`

---

## ESCENA 4 · Junto a la ventana, con la taza (plano 7)
**Partes de:** `r2_de-pie-taza_ojos-abiertos.png`

**ESCENA:**
```
Keep @Dani exactly the same — face, hair, beige linen shirt, black trousers, the cup in her hands, pose, position and size. Replace the plain background with a very simple corner of her home: a white wall, one thin floor line and a tall window on the right with a sheer linen curtain; soft light comes through the window onto her face. SIMPLE SURFACES: the bed, sheets, pillows, furniture, curtain and floor are drawn very simply — flat white shapes with clean outlines and only two or three simple fold lines, no texture, no hatching, no wood grain, no fabric detail, no rug. Only @Dani keeps her full detail and color. BACKGROUND DENSITY: a cozy, readable scene like a coloring-book page but about 20% less busy: 4 to 6 objects in total (the main furniture, the window with its curtain and two or three small details), lots of empty white space. The window shows only soft light or white, no outside view. Only a minimal soft contact shadow under furniture and feet. The top of the illustration fades softly into white, with no visible edge. BACKGROUND STYLE: white line-art illustration — clean thin black ink lines on a white background; the background is mostly pure white and uncolored. LINE: uniform medium black outline, like a clean coloring-book illustration, rounded line ends, no hatching. COLOR: only some objects get flat brand colors, no shading: wood (furniture, window and door frames) #D7B18F; textiles (curtain, cushions, blanket, towel) #EED3BB or #F4D5DC; plants #3F4A3A; ceramics (cups, jars, pots) #EED3BB or #F4D5DC. Everything else stays white. Color covers no more than 20% of the background. No colored walls, no colored floor fills, no painted gradients. Light from the window is suggested with a very soft, almost white warm glow. @Dani stays in full color, exactly as in the original image. The upper third of the frame is empty white wall. No text, no steam.
```
**B · párpados pesados** (edita la ESCENA):
```
Keep everything exactly the same — scene, light, framing, face shape, hair, clothes, cup — but her eyelids are heavy and half closed, tired and absent.
```
Archivos: `r2e_ventana_ojos-abiertos.png` · `r2e_ventana_parpados-pesados.png`

---

## ESCENA 5 · Cocina amplia, vacía (plano 6: ahí Claude pone a Dani pequeña)
Adjunta con "+" **la ESCENA 3 terminada**.
```
The same kitchen as the attached image, seen from further back in a wide shot: the whole counter, the window with the sheer linen curtain, more white wall. Nobody in the scene, empty room. Same white line-art background style: thin black lines on white, color only on a few wooden details (max 20% of the background). The upper third of the frame is empty white wall. No text, no steam.
```
Archivo: `r2e_cocina-amplia_vacia.png`

---

## Control antes de enviar (11 imágenes)
- [ ] Dani es idéntica a la imagen de partida (rostro, pelo, ropa, posición).
- [ ] Cada B coincide con su ESCENA: el mismo fondo y la misma luz, solo cambia el detalle pedido.
- [ ] Ventana con cortina de lino visible en todas las escenas.
- [ ] El tercio superior está despejado.
- [ ] Sin texto ni vapor dibujado.
- [ ] Fondo en line art blanco con líneas negras; el color, solo en detalles de madera y marcos, no supera el 20 % del fondo.
- [ ] Dani a todo color.

**Adjúntalas como ARCHIVO** (clip 📎), no pegadas en el chat: si las pegas, no me llegan como archivo.
