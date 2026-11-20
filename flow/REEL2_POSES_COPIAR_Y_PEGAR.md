# Flow · Reel 2 · Burnout · Poses de Dani (copiar y pegar)

## Antes de empezar (una vez)
1. Abre tu proyecto en Flow, donde está guardada **@Dani** en Personajes.
2. **Apaga el agente.**
3. Elige el modelo **Nano Banana 2.1**, en formato **9:16**.
4. Usa **solo IMAGEN**. No hagas videos: el movimiento lo hace Claude en Remotion.

## ⚠️ Corrección de rostro (20-11): menos anime
Si Flow devuelve a Dani con la cara redonda o con aspecto de anime:
1. **Adjunta siempre con "+"** la imagen de referencia oficial `assets/referencias/dani_guia-estilo_de-pie_mano-pecho.jpg` (Dani de pie con la mano en el pecho, rostro ovalado). Todos los prompts ya terminan con *"Same face… as the attached reference image"*.
2. Los prompts ya incluyen el bloque anti-anime (rostro adulto ovalado, ojos pequeños, NOT anime/manga/chibi).
3. **Recomendado:** actualiza la descripción de @Dani en Flow → Personajes. Agrega al principio del texto actual:
```
Adult oval, slightly long face with a defined jaw and mature features; small simple eyes without shine; NOT anime, NOT manga, NOT chibi, no round baby face; European editorial book illustration style.
```
4. Si aun así sale anime, **edita la imagen elegida** con este prompt (adjuntando la referencia con "+"):
```
Edit only her face, keep everything else exactly the same (hair, clothes, bed, pose, light, framing). Make it the face of an adult woman of about 35, like the attached reference image: a longer oval face with a defined jaw and narrower cheeks; small simple dark eyes with a thin upper eyelid line, no highlights, no eyelashes, no detailed iris; thin one-line eyebrows; the nose a single short stroke; the mouth a short straight neutral line, not smiling; flat skin with no blush. Empty, calm expression. Not anime, not manga.
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
@Dani sleeps on her side in a neatly made bed with cream linen sheets and a pillow, wearing soft cream cotton pajamas, one hand near her face, peaceful and still. Seen slightly from above, the whole bed visible. Soft warm light coming from the right. Plain flat white background behind the bed, no other furniture, no wall details. No text, no steam. Her face is an adult oval face, slightly long, with a defined jaw and mature features; small simple eyes (no big eyes, no shine in the eyes), thin one-line eyebrows, a single-stroke nose, a short line mouth. NOT anime, NOT manga, NOT chibi, NOT cartoon, no round baby face. European editorial illustration style, like a book or magazine illustration, clean ink outline. Same face, hair and illustration style as the attached reference image.
```

---

## POSE 2 · Acostada boca arriba (primer plano)
**Archivo A:** `r2_boca-arriba_ojos-cerrados.png`
```
Close-up. @Dani lies on her back in bed in cream cotton pajamas, her wavy dark burgundy hair spread on a cream pillow, eyes gently closed as thin curves, calm expression. Seen from above. Soft pale morning light coming from the right. The upper third of the frame is empty white pillow. No text. Her face is an adult oval face, slightly long, with a defined jaw and mature features; small simple eyes (no big eyes, no shine in the eyes), thin one-line eyebrows, a single-stroke nose, a short line mouth. NOT anime, NOT manga, NOT chibi, NOT cartoon, no round baby face. European editorial illustration style, like a book or magazine illustration, clean ink outline. Same face, hair and illustration style as the attached reference image.
```
**Archivo B:** `r2_boca-arriba_ojos-abiertos.png` (editar la imagen A)
```
Keep everything exactly the same — framing, size, position, hair, pajamas, light, and exactly the same face (adult, oval, not anime) — but her eyes are now open, looking up at the ceiling, empty calm gaze, not sad.
```

---

## POSE 3 · Sentada al borde de la cama
**Archivo A:** `r2_borde-cama_hombros-arriba.png`
```
@Dani sits on the edge of a neatly made bed with cream linen sheets, already dressed for work in a beige linen shirt and black trousers, black sneakers, hands resting on her knees, staring at nothing. Rested body, empty gaze. Full body, seen from the side. Soft warm light coming from the right. Plain flat white background, no other furniture, no wall details. The upper third of the frame is empty. No text, no steam. Her face is an adult oval face, slightly long, with a defined jaw and mature features; small simple eyes (no big eyes, no shine in the eyes), thin one-line eyebrows, a single-stroke nose, a short line mouth. NOT anime, NOT manga, NOT chibi, NOT cartoon, no round baby face. European editorial illustration style, like a book or magazine illustration, clean ink outline. Same face, hair and illustration style as the attached reference image.
```
**Archivo B:** `r2_borde-cama_hombros-abajo.png` (editar la imagen A)
```
Keep everything exactly the same — framing, size, position, clothes, bed, light, and exactly the same face (adult, oval, not anime) — but her shoulders have dropped gently, as after a long exhale.
```

---

## POSE 4 · Sirviendo café de pie
**Archivo A:** `r2_cocina_jarra-arriba.png`
```
@Dani stands at a light wooden kitchen counter in a beige linen shirt and black trousers, holding a coffee pot just above a cream ceramic cup on the counter, about to pour, gaze absent, on autopilot. Full body, seen from the side. Soft warm light coming from the right. Plain flat white background, only the counter, no cabinets, no wall details. The upper third of the frame is empty. No text, no steam. Her face is an adult oval face, slightly long, with a defined jaw and mature features; small simple eyes (no big eyes, no shine in the eyes), thin one-line eyebrows, a single-stroke nose, a short line mouth. NOT anime, NOT manga, NOT chibi, NOT cartoon, no round baby face. European editorial illustration style, like a book or magazine illustration, clean ink outline. Same face, hair and illustration style as the attached reference image.
```
**Archivo B:** `r2_cocina_jarra-inclinada.png` (editar la imagen A)
```
Keep everything exactly the same — framing, size, position, clothes, counter, light, and exactly the same face (adult, oval, not anime) — but the coffee pot is now tilted, pouring coffee into the cup, which is almost full. Her face does not change.
```

---

## POSE 5 · De pie con la taza en las manos
**Archivo A:** `r2_de-pie-taza_ojos-abiertos.png`
```
@Dani stands in a beige linen shirt and black trousers, black sneakers, holding a cream ceramic coffee cup with both hands at chest height without drinking, shoulders gently dropped, eyes open with an absent gaze. Present, not quite there. Full body, seen from the side. Soft warm light coming from the right. Plain flat white background, no furniture, no shadows on the background. No text, no steam. Her face is an adult oval face, slightly long, with a defined jaw and mature features; small simple eyes (no big eyes, no shine in the eyes), thin one-line eyebrows, a single-stroke nose, a short line mouth. NOT anime, NOT manga, NOT chibi, NOT cartoon, no round baby face. European editorial illustration style, like a book or magazine illustration, clean ink outline. Same face, hair and illustration style as the attached reference image.
```
**Archivo B:** `r2_de-pie-taza_parpados-pesados.png` (editar la imagen A)
```
Keep everything exactly the same — framing, size, position, clothes, cup, light, and exactly the same face (adult, oval, not anime) — but her eyelids are heavy and half closed.
```

---

## Control antes de enviarme las imágenes
- [ ] Es Dani en las 9 imágenes: el mismo rostro, el mismo pelo y el mismo trazo.
- [ ] Pijama en las poses 1 y 2; camisa de lino beige y pantalón negro en las poses 3, 4 y 5.
- [ ] Cada B coincide con su A: el mismo encuadre, solo cambia el detalle pedido.
- [ ] Rostro adulto ovalado, no anime.
- [ ] Fondo blanco liso, sin texto, sin vapor y sin manos deformadas.
- [ ] Luz cálida desde la derecha, sin tonos grises ni azules.

**Para enviarlas:** adjunta las 9 imágenes en el chat.
