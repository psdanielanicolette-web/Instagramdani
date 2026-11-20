import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Frase } from "./Frase";
import { COLOR, FPS, W } from "./tokens";

// Cierre (7 s): fundido a crema → espiral clara que se pinta de afuera hacia
// adentro (3,6 s) → punto de acuarela beige que late (doble pulso, 1,1 s) →
// frase en borgoña desde los 2,4 s. `desde` = segundo absoluto donde empieza.
const CX = W / 2;
const CY = 1010;
const R_EXT = 330;
const R_INT = 26;
const VUELTAS = 2.7;

function espiral(offset: number): string {
  // espiral de Arquímedes desde afuera hacia adentro
  const pasos = 420;
  const pts: string[] = [];
  for (let i = 0; i <= pasos; i++) {
    const k = i / pasos;
    const ang = -Math.PI / 2 + k * VUELTAS * Math.PI * 2;
    const r = R_EXT - (R_EXT - R_INT) * k + offset * (1 - k * 0.6);
    pts.push(`${(CX + Math.cos(ang) * r).toFixed(1)},${(CY + Math.sin(ang) * r).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

const LARGO = 5200; // largo aproximado del trazo (para el dash)
const D_CENTRO = espiral(0);
const D_FUERA = espiral(11);
const D_DENTRO = espiral(-11);

export const Cierre: React.FC<{ desde: number; frase: string }> = ({ desde, frase }) => {
  const t = useCurrentFrame() / FPS - desde;
  if (t < 0) return null;
  const fondo = interpolate(t, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const pinta = interpolate(t, [0.4, 4.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const dash = { strokeDasharray: LARGO, strokeDashoffset: LARGO * (1 - pinta) };

  // latido: doble pulso cada 1,1 s
  const ph = ((t - 3.6) / 1.1) % 1;
  const pulso = t > 3.6 ? Math.exp(-(((ph - 0.06) / 0.05) ** 2)) + 0.6 * Math.exp(-(((ph - 0.3) / 0.06) ** 2)) : 0;
  const punto = interpolate(t, [3.5, 4.0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR.crema, opacity: fondo }}>
      <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="acuarela">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
          <radialGradient id="halo">
            <stop offset="0" stopColor={COLOR.beige} stopOpacity="0.55" />
            <stop offset="1" stopColor={COLOR.beige} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* cinta beige suave y transparente */}
        <path d={D_CENTRO} stroke={COLOR.beige} strokeWidth={24} fill="none" strokeLinecap="round" opacity={0.6} style={dash} />
        {/* líneas finas de tinta a cada lado */}
        <path d={D_FUERA} stroke={COLOR.tinta} strokeWidth={1.1} fill="none" opacity={0.28} style={dash} />
        <path d={D_DENTRO} stroke={COLOR.tinta} strokeWidth={1.1} fill="none" opacity={0.28} style={dash} />
        {/* punto de acuarela que late */}
        <g opacity={punto} transform={`translate(${CX},${CY}) scale(${1 + 0.22 * pulso})`}>
          <circle r={52} fill="url(#halo)" opacity={0.5 + 0.5 * pulso} />
          <circle r={15} fill={COLOR.beige} filter="url(#acuarela)" />
          <circle r={15} fill="none" stroke="#D7B18F" strokeWidth={2.2} filter="url(#acuarela)" opacity={0.8} />
          <path d="M 13 -7 A 15 15 0 1 1 9 -12" fill="none" stroke={COLOR.tinta} strokeWidth={1.2} opacity={0.6} />
        </g>
      </svg>
      <Frase texto={frase} desde={desde + 2.4} cierre />
    </AbsoluteFill>
  );
};
