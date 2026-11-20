import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLOR, FPS, TEXTO } from "./tokens";

// Frase que entra palabra por palabra y sale con un fundido.
// `desde` y `hasta` en segundos absolutos del reel.
export const Frase: React.FC<{
  texto: string;
  desde: number;
  hasta?: number; // sin `hasta`: se queda hasta el final
  cierre?: boolean;
}> = ({ texto, desde, hasta, cierre = false }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (t < desde || (hasta !== undefined && t > hasta)) return null;

  const salida =
    hasta === undefined
      ? 1
      : interpolate(t, [hasta - TEXTO.salida, hasta], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const palabras = texto.split(" ");
  return (
    <div
      style={{
        position: "absolute",
        left: TEXTO.margenIzq,
        top: cierre ? TEXTO.topCierre : TEXTO.top,
        width: TEXTO.anchoMax,
        fontFamily: TEXTO.fuente,
        fontWeight: TEXTO.peso,
        fontSize: TEXTO.tamano,
        lineHeight: TEXTO.interlineado,
        color: cierre ? COLOR.borgona : COLOR.texto,
        opacity: salida,
        textAlign: "left",
      }}
    >
      {palabras.map((p, i) => {
        const t0 = desde + i * TEXTO.retrasoPalabra;
        const k = interpolate(t, [t0, t0 + TEXTO.entradaPalabra], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: k,
              transform: `translateY(${(1 - k) * TEXTO.subida}px)`,
              marginRight: "0.25em",
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};
