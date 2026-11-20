# Qué entregar para recrear la gráfica de Dani en Remotion

## Reparto de trabajo
| Capa | Estilo | Quién la hace |
|---|---|---|
| **Fondo** (pared, ventana, mesa, silla, taza, cama, cocina) | Line art con detalles pequeños de color | **Claude, en código** (SVG), calibrado con el Reel 1 |
| **Dani** | Ilustración pintada (su propio estilo) | **Daniela, en Flow** (solo imágenes) → Claude anima los recortes |
| Luz, polvo, vapor, persiana, texto, espiral | Sistema del maestro | Claude, en código |

Claude no puede generar ilustraciones nuevas de Dani: solo puede animar y componer las imágenes que recibe. Por eso las poses tienen que venir de Flow.

## 1. Referencias (una sola vez)
- [ ] **Las imágenes originales de Flow del Reel 1**, en la máxima resolución, no capturas del video.
- [ ] **La imagen de referencia "Person holding mug by window".**
- [ ] **La animación de persiana de referencia** que usaste para la intro.
- [ ] Cualquier imagen de @Dani que consideres "la oficial" (hoja de personaje).

## 2. Reglas de las imágenes de Dani
1. **Fondo plano y uniforme**, crema liso y sin escenario: *"on a plain flat cream background, no furniture, no shadows on the background"*. Así se recorta limpio y la pongo sobre mis fondos line art.
   - Excepción: si Dani está sentada o acostada, el mueble va incluido (silla o cama), porque el cuerpo se apoya en él. Yo integro ese mueble al fondo.
2. **Luz siempre desde la derecha** (la ventana del Reel 1 está a la derecha), suave y cálida.
3. **Pares A/B idénticos:** la pose B se hace **editando la imagen A** en Flow, no generándola desde cero, para que el encuadre, el tamaño y la posición coincidan. Solo cambia la parte que se mueve (los ojos, la mano, los hombros).
4. **Formato:** PNG en 9:16, en la máxima resolución que dé Flow. Los primeros planos, ojalá a 2× (necesito margen para el zoom de 1,3×).
5. **La misma ropa** en todas las poses de un mismo reel.
6. **Nombre del archivo:** `reel_pose_estado.png`. Por ejemplo `r2_borde-cama_hombros-arriba.png` y `r2_borde-cama_hombros-abajo.png`.

## 3. Biblioteca de poses
### Base (sirve para todos los reels)
| Pose | Variantes A/B |
|---|---|
| Sentada en silla, de perfil o 3/4, manos en las rodillas | ojos abiertos / ojos cerrados |
| Igual, con una mano en el pecho | ojos abiertos / ojos cerrados |
| De pie de perfil, taza en ambas manos | ojos abiertos / párpados pesados |
| Primer plano del rostro, 3/4 | neutro / ojos cerrados / sonrisa suave |

### Reel 2 · Burnout (pijama crema los planos 1-2; camisa de lino beige y pantalón negro del 3 al 7)
| Plano | A | B |
|---|---|---|
| 1 · Duerme de lado en la cama | respiración arriba | respiración abajo (hombro apenas más bajo) |
| 2 · Primer plano acostada boca arriba | ojos cerrados | ojos abiertos mirando el techo |
| 3 · Sentada al borde de la cama | hombros arriba | hombros caídos (exhala) |
| 4 · De pie en la cocina, sirviendo café | jarra arriba | jarra inclinada |
| 5 · Mano quieta junto a la taza (inserto) | — | — |
| 7 · De pie junto a la ventana con la taza | ojos abiertos | párpados pesados |

### Reels 3 y 4
Las poses están en las tablas de `reels/r3-soledad/planos-y-escenas.md` y `reels/r4-identidad/planos-y-escenas.md` (imágenes A y B). Las amigas siguen las mismas reglas: fondo plano y pares A/B.

## 4. Prompt base de Flow (agente APAGADO · Nano Banana 2.1 · 9:16)
```
@Dani [POSE], wearing [ROPA], [EXPRESIÓN calma, contenida]. Full body, seen from the side. Soft warm light coming from the right. On a plain flat cream background, no furniture, no props, no shadows on the background. No text. Same illustration style, face and hair as her previous images.
```
Para la pose B, **edita la imagen A** con:
```
Keep everything exactly the same — framing, size, position, clothes, light — but [CAMBIO: her eyes gently closed / her shoulders dropped as after a long exhale / her right hand resting on her chest].
```

## 5. Cómo enviarlo
- Adjunta los archivos en el chat, por reel. Primero las **referencias** y el **Reel 2**.
- Con las referencias calibro los fondos line art. Con las poses del Reel 2 armo la primera versión en Remotion.
