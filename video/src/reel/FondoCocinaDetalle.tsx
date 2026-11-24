import React from "react";
import { useCurrentFrame } from "remotion";
import { Cortina, LT, MADERA, OLIVA, ROSA, TEXTIL } from "./LineArt";
import { FPS, H, W } from "./tokens";

// Muestra de estilo (referencia: assets/referencias/fondos/ref_cocina.png, con ~20 % menos):
// cocina en perspectiva de un punto, línea negra uniforme de 3 px, objetos con
// detalle dentro de la línea, color de marca solo en algunos objetos.
// Todo queda bajo y = 780 (franja del texto libre).
const L = { stroke: LT, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "#fff" };
const L2 = { ...L, strokeWidth: 2 };

const Hoja: React.FC<{ x: number; y: number; r: number; l: number }> = ({ x, y, r, l }) => (
  <g transform={`translate(${x},${y}) rotate(${r})`}>
    <path d={`M 0 0 C ${-l * 0.32} ${-l * 0.3}, ${-l * 0.26} ${-l * 0.85}, 0 ${-l} C ${l * 0.26} ${-l * 0.85}, ${l * 0.32} ${-l * 0.3}, 0 0 Z`} {...L2} fill={OLIVA} fillOpacity={0.8} />
    <path d={`M 0 ${-l * 0.1} L 0 ${-l * 0.85}`} stroke="#fff" strokeWidth={1.4} fill="none" opacity={0.8} />
  </g>
);

const PlantaMaceta: React.FC<{ x: number; y: number; s?: number; fase?: number }> = ({ x, y, s = 1, fase = 0 }) => {
  const t = useCurrentFrame() / FPS;
  const m = (i: number) => 2 * Math.sin((2 * Math.PI * t) / 6 + i * 0.8 + fase);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M 0 0 C -2 -30, -6 -60, -4 -90" {...L2} fill="none" />
      <path d="M 0 0 C 6 -28, 14 -52, 22 -70" {...L2} fill="none" />
      <Hoja x={-4} y={-88} r={-8 + m(0)} l={50} />
      <Hoja x={22} y={-68} r={34 + m(1)} l={44} />
      <Hoja x={-2} y={-52} r={-48 + m(2)} l={40} />
      <Hoja x={6} y={-30} r={52 + m(3)} l={34} />
      <path d="M -30 0 L 30 0 L 24 54 L -24 54 Z" {...L} fill={TEXTIL} />
      <rect x={-34} y={-8} width={68} height={12} rx={3} {...L} fill={TEXTIL} />
    </g>
  );
};

export const FondoCocinaDetalle: React.FC<{ pisoY: number }> = ({ pisoY }) => {
  const t = useCurrentFrame() / FPS;
  const pano = 3 * Math.sin((2 * Math.PI * t) / 5.5);
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <rect width={W} height={H} fill="#FFFEFE" />

      {/* esquina del cuarto (perspectiva de un punto): pared izquierda en fuga */}
      <path d={`M 0 790 L 150 860 L 150 ${pisoY - 60} L 0 ${pisoY + 10}`} {...L} fill="#FFFEFE" />

      {/* muebles altos a la izquierda: dos puertas con manilla */}
      <rect x={170} y={820} width={300} height={200} {...L} />
      <line x1={320} y1={820} x2={320} y2={1020} {...L} />
      <rect x={186} y={836} width={118} height={168} {...L2} />
      <rect x={336} y={836} width={118} height={168} {...L2} />
      <circle cx={296} cy={990} r={6} {...L2} />
      <circle cx={344} cy={990} r={6} {...L2} />

      {/* barra con paño a cuadros (textil) */}
      <line x1={180} y1={1080} x2={420} y2={1080} {...L} />
      {[220, 300, 380].map((x) => (
        <path key={x} d={`M ${x} 1080 q -6 10 0 20`} {...L2} fill="none" />
      ))}
      <g transform={`translate(300,1100) rotate(${pano})`}>
        <path d="M -30 0 L 30 0 L 34 110 L -34 110 Z" {...L} fill={ROSA} />
        {[22, 44, 66, 88].map((y) => (
          <line key={y} x1={-32} y1={y} x2={32} y2={y} {...L2} />
        ))}
        {[-12, 12].map((x) => (
          <line key={x} x1={x} y1={0} x2={x * 1.1} y2={110} {...L2} />
        ))}
      </g>

      {/* azulejos detrás del mesón */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`az${i}`} x1={150} y1={1250 + i * 70} x2={1080} y2={1250 + i * 70} {...L2} opacity={0.55} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`ay${i}`} x1={150 + i * 80} y1={1250} x2={150 + i * 80} y2={Math.min(pisoY, 1600)} {...L2} opacity={0.55} />
      ))}

      {/* repisa abierta con frascos, tazas apiladas y tetera (cerámica) */}
      <rect x={560} y={820} width={170} height={380} {...L} />
      <rect x={560} y={1000} width={170} height={12} {...L} fill={MADERA} />
      <path d="M 585 1000 L 585 930 Q 585 918 597 918 L 633 918 Q 645 918 645 930 L 645 1000" {...L} fill={TEXTIL} />
      <rect x={598} y={902} width={34} height={16} rx={4} {...L2} />
      <path d="M 662 1000 L 662 968 L 708 968 L 708 1000" {...L} />
      <path d="M 662 968 L 662 944 L 708 944 L 708 968" {...L} fill={ROSA} />
      <path d="M 708 954 q 14 2 0 14" {...L2} fill="none" />
      <path d="M 590 1188 C 590 1130, 690 1130, 690 1188 Z" {...L} fill={TEXTIL} />
      <path d="M 690 1160 C 712 1150, 716 1130, 726 1120" {...L} fill="none" />
      <circle cx={640} cy={1128} r={8} {...L2} />
      <rect x={560} y={1188} width={170} height={12} {...L} fill={MADERA} />

      {/* ventana con cortina de lino (se mueve) */}
      <rect x={780} y={830} width={250} height={340} {...L} fill={MADERA} />
      <rect x={796} y={846} width={218} height={308} {...L} fill="#FFFDF8" />
      <rect x={900} y={846} width={10} height={308} {...L2} fill={MADERA} />
      <rect x={796} y={995} width={218} height={10} {...L2} fill={MADERA} />
      <line x1={830} y1={880} x2={860} y2={912} {...L2} opacity={0.45} />
      <rect x={764} y={1170} width={282} height={16} {...L} fill={MADERA} />
      <PlantaMaceta x={985} y={1170} s={0.75} fase={1} />
      <Cortina x={742} y={810} w={96} h={410} fase={0.5} />

      {/* piso de baldosas (color que calza con la imagen de Dani) */}
      <rect x={0} y={pisoY} width={W} height={H - pisoY} fill="#F1E2D0" />
      <line x1={0} y1={pisoY} x2={W} y2={pisoY} {...L} fill="none" />
      {[0.18, 0.42].map((k) => (
        <line key={k} x1={0} y1={pisoY + (H - pisoY) * k} x2={W} y2={pisoY + (H - pisoY) * k} {...L2} opacity={0.4} />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`pv${i}`} x1={540 + (i - 4) * 90} y1={pisoY} x2={540 + (i - 4) * 220} y2={H} {...L2} opacity={0.4} />
      ))}
    </svg>
  );
};
