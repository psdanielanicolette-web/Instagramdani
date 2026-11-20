import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Frase } from "./Frase";
import { FPS } from "./tokens";

// Cierre (decisión del 20-11-2026: sin espiral). La última escena sigue de
// fondo, la luz baja un poco con una veladura cálida y la frase de cierre
// entra en borgoña. `desde` = segundo absoluto donde empieza el cierre.
export const Cierre: React.FC<{ desde: number; frase: string; entradaFrase?: number }> = ({
  desde,
  frase,
  entradaFrase = 0.8,
}) => {
  const t = useCurrentFrame() / FPS - desde;
  if (t < 0) return null;
  const baja = interpolate(t, [0, 1.2], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "#E9DCCB", mixBlendMode: "multiply", opacity: 0.35 * baja }} />
      <AbsoluteFill style={{ backgroundColor: "#FFFEFE", opacity: 0.18 * baja }} />
      <Frase texto={frase} desde={desde + entradaFrase} cierre />
    </AbsoluteFill>
  );
};
