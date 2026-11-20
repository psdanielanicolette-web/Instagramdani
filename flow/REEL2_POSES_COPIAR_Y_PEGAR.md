# Flow · Reel 2 · Burnout · Poses de Dani (copiar y pegar)

## Antes de empezar (una vez)
1. Abre tu proyecto en Flow, donde está guardada **@Dani** en Personajes.
2. **Apaga el agente.**
3. Elige el modelo **Nano Banana 2.1**, en formato **9:16**.
4. Usa **solo IMAGEN**. No hagas videos: el movimiento lo hace Claude en Remotion.

## ⭐ ROSTRO OFICIAL (20-11)
**En TODAS las poses, adjunta con "+" la imagen `assets/referencias/dani_ROSTRO_OFICIAL.webp`** (Dani sentada en el suelo, suéter oliva). Es la cara elegida por Daniela. Todos los prompts dicen *"Same face as the attached reference image"*.
⚠️ Esa imagen es **solo referencia de rostro**: la pose (sentada en el suelo, abrazando las rodillas) no se usa en el contenido, porque se acerca a la "persona ovillada" que prohíbe Teo.

## Corrección de rostro (historial)
Si Flow devuelve a Dani con la cara redonda o con aspecto de anime:
1. **Adjunta siempre con "+"** la imagen de referencia oficial `assets/referencias/dani_guia-estilo_de-pie_mano-pecho.jpg` (Dani de pie con la mano en el pecho, rostro redondeado y suave). Todos los prompts ya terminan con *"Same face… as the attached reference image"*.
2. Los prompts ya incluyen el bloque anti-anime (rostro redondeado y suave con mentón suave, ojos pequeños sin brillo, no anime).
3. **Recomendado:** actualiza la descripción de @Dani en Flow → Personajes. Agrega al principio del texto actual:
```
Soft, gently rounded adult face with full soft cheeks and a small soft rounded chin, no pointed chin; small simple eyes without shine, no big anime eyes; not anime, not manga; editorial book illustration style.
```
4. Si aun así sale anime, **edita la imagen elegida** con este prompt (adjuntando la referencia con "+"):
```
Edit only her face, keep everything else exactly the same (hair, clothes, bed, pose, light, framing). Make it the face of an adult woman of about 35, like the attached reference image: a soft, gently rounded face with full soft cheeks and a small soft rounded chin, no pointed chin; small simple dark eyes with a thin upper eyelid line, no highlights, no eyelashes, no detailed iris; thin one-line eyebrows; the nose a single short stroke; the mouth a short straight neutral line, not smiling; flat skin with no blush. Empty, calm expression. Not anime, not manga.
```
Y si el pelo sale café o claro, agrega: `Her hair is dark burgundy, deep wine color.`

## Fondos
Dani va siempre sobre **fondo blanco liso**. Los fondos de escena los dibuja Claude en **line art con predominio de blanco y detalles mínimos de color** (no fondo coloreado).

## Cómo funciona cada pose
- **Paso A:** pegas el prompt A y generas. Revisas que sea Dani (pelo borgoña ondulado, rostro mínimo, la ropa correcta).
- **Paso B:** sobre la imagen A elegida, usas **editar imagen** y pegas el prompt B. No generes la B desde cero.
- **Descarga:** en PNG o en la máxima calidad disponible, con el nombre indicado.
- **Si sale con un tono gris o frío:** adjunta con "+" la imagen "Person holding mug by window" y agrega al final *match the colors and light of this image.*

---

## POSE 1 · Dormida de lado
**Archivo:** `r2_cama-lado.png` (solo A)
```
@Dani sleeps on her side in a neatly made bed with cream linen sheets and a pillow, wearing soft cream cotton pajamas, one hand near her face, peaceful and still. Seen slightly from above, the whole bed visible. Soft warm light coming from the right. Plain flat white background behind the bed, no other furniture, no wall details. No text, no steam. Same face as the attached reference image: a soft adult face of a woman of about 35, small dark simple eyes with a thin upper eyelid line, straight thin eyebrows, a small single-stroke nose, a small calm neutral mouth, flat skin with no blush; serious, quiet adult expression. Long wavy deep burgundy hair, a dark wine color, reaching mid-back. Semi-realistic editorial illustration, clean ink outline, flat colors with soft two-step shading. Not anime, not girlish.
```

---

## POSE 2 · Acostada boca arriba (primer plano) · v2: cabeza en 3/4
> Cabeza en 3/4. Referencia de rostro: `dani_ROSTRO_OFICIAL.webp`.

**Archivo A:** `r2_boca-arriba_ojos-cerrados.png`
```
Close-up, seen slightly from the side. @Dani lies on her back in bed in cream cotton pajamas, her head resting on a white pillow and turned slightly toward the window on the right, in three-quarter view. Her long hair spread on the pillow and falling over her shoulder. Eyes gently closed as thin curves. Same face as the attached reference image: a soft adult face of a woman of about 35, small dark simple eyes with a thin upper eyelid line, straight thin eyebrows, a small single-stroke nose, a small calm neutral mouth, flat skin with no blush; serious, quiet adult expression. Long wavy deep burgundy hair, a dark wine color, reaching mid-back. Semi-realistic editorial illustration, clean ink outline, flat colors with soft two-step shading. Not anime, not girlish.
```
**Archivo B:** `r2_boca-arriba_ojos-abiertos.png` (editar la imagen A)
```
Keep everything exactly the same — face, head angle, hair, pajamas, pillow, light, framing — but her eyes are now softly open, gazing at the ceiling, calm and absent, not sad.
```

---

## POSE 3 · Sentada al borde de la cama
**Archivo A:** `r2_borde-cama_hombros-arriba.png`
```
@Dani sits on the edge of a neatly made bed with cream linen sheets, already dressed for work in a beige linen shirt and black trousers, black sneakers, hands resting on her knees, staring at nothing. Rested body, empty gaze. Full body, seen from the side. Soft warm light coming from the right. Plain flat white background, no other furniture, no wall details. The upper third of the frame is empty. No text, no steam. Same face as the attached reference image: a soft adult face of a woman of about 35, small dark simple eyes with a thin upper eyelid line, straight thin eyebrows, a small single-stroke nose, a small calm neutral mouth, flat skin with no blush; serious, quiet adult expression. Long wavy deep burgundy hair, a dark wine color, reaching mid-back. Semi-realistic editorial illustration, clean ink outline, flat colors with soft two-step shading. Not anime, not girlish.
```
**Archivo B:** `r2_borde-cama_hombros-abajo.png` (editar la imagen A)
```
Keep everything exactly the same — framing, size, position, clothes, bed, light, and exactly the same face (soft rounded face, not anime) — but her shoulders have dropped gently, as after a long exhale.
```

---

## POSE 4 · Sirviendo café de pie
**Archivo A:** `r2_cocina_jarra-arriba.png`
```
@Dani stands at a light wooden kitchen counter in a beige linen shirt and black trousers, holding a coffee pot just above a cream ceramic cup on the counter, about to pour, gaze absent, on autopilot. Full body, seen from the side. Soft warm light coming from the right. Plain flat white background, only the counter, no cabinets, no wall details. The upper third of the frame is empty. No text, no steam. Same face as the attached reference image: a soft adult face of a woman of about 35, small dark simple eyes with a thin upper eyelid line, straight thin eyebrows, a small single-stroke nose, a small calm neutral mouth, flat skin with no blush; serious, quiet adult expression. Long wavy deep burgundy hair, a dark wine color, reaching mid-back. Semi-realistic editorial illustration, clean ink outline, flat colors with soft two-step shading. Not anime, not girlish.
```
**Archivo B:** `r2_cocina_jarra-inclinada.png` (editar la imagen A)
```
Keep everything exactly the same — framing, size, position, clothes, counter, light, and exactly the same face (soft rounded face, not anime) — but the coffee pot is now tilted, pouring coffee into the cup, which is almost full. Her face does not change.
```

---

## POSE 5 · De pie con la taza en las manos
**Archivo A:** `r2_de-pie-taza_ojos-abiertos.png`
```
@Dani stands in a beige linen shirt and black trousers, black sneakers, holding a cream ceramic coffee cup with both hands at chest height without drinking, shoulders gently dropped, eyes open with an absent gaze. Present, not quite there. Full body, seen from the side. Soft warm light coming from the right. Plain flat white background, no furniture, no shadows on the background. No text, no steam. Same face as the attached reference image: a soft adult face of a woman of about 35, small dark simple eyes with a thin upper eyelid line, straight thin eyebrows, a small single-stroke nose, a small calm neutral mouth, flat skin with no blush; serious, quiet adult expression. Long wavy deep burgundy hair, a dark wine color, reaching mid-back. Semi-realistic editorial illustration, clean ink outline, flat colors with soft two-step shading. Not anime, not girlish.
```
**Archivo B:** `r2_de-pie-taza_parpados-pesados.png` (editar la imagen A)
```
Keep everything exactly the same — framing, size, position, clothes, cup, light, and exactly the same face (soft rounded face, not anime) — but her eyelids are heavy and half closed.
```

---

## Control antes de enviarme las imágenes
- [ ] Es Dani en las 9 imágenes: el mismo rostro, el mismo pelo y el mismo trazo.
- [ ] Pijama en las poses 1 y 2; camisa de lino beige y pantalón negro en las poses 3, 4 y 5.
- [ ] Cada B coincide con su A: el mismo encuadre, solo cambia el detalle pedido.
- [ ] El mismo rostro que `dani_ROSTRO_OFICIAL.webp`: adulto, ojos pequeños, boca neutra, no anime.
- [ ] Fondo blanco liso, sin texto, sin vapor y sin manos deformadas.
- [ ] Luz cálida desde la derecha, sin tonos grises ni azules.

**Para enviarlas:** adjunta las 9 imágenes en el chat.
