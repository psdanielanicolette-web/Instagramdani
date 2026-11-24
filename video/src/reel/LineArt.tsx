import React from "react";
import { useCurrentFrame } from "remotion";
import { FPS, H, W } from "./tokens";

// Fondos en line art (estilo de las referencias de assets/referencias/fondos/):
// línea negra uniforme de ≈3 px, blanco predominante y color de marca por objeto
// (madera #D7B18F · textiles #EED3BB/#F4D5DC · plantas #3F4A3A · cerámica #EED3BB).
// Elementos vivos dibujados en código: cortina y planta.

export const LT = "#2D2825";
export const MADERA = "#D7B18F";
export const TEXTIL = "#EED3BB";
export const ROSA = "#F4D5DC";
export const OLIVA = "#3F4A3A";
const L = { stroke: LT, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const useT = () => useCurrentFrame() / FPS;

// ---------- cortina que ondula (anclada en la barra) ----------
export const Cortina: React.FC<{ x: number; y: number; w: number; h: number; fase?: number }> = ({ x, y, w, h, fase = 0 }) => {
  const t = useT();
  const a = 9 * Math.sin((2 * Math.PI * t) / 5 + fase) + 3 * Math.sin((2 * Math.PI * t) / 2.3 + fase);
  const b = a * 0.6;
  const d = `M ${x} ${y}
    C ${x + a * 0.2} ${y + h * 0.35}, ${x - 6 + a * 0.6} ${y + h * 0.7}, ${x + a} ${y + h}
    Q ${x + w * 0.25 + a} ${y + h + 10}, ${x + w * 0.5 + b} ${y + h - 4}
    Q ${x + w * 0.75 + b} ${y + h + 8}, ${x + w + b * 0.5} ${y + h}
    C ${x + w + 4 + b * 0.4} ${y + h * 0.7}, ${x + w - 2 + b * 0.2} ${y + h * 0.35}, ${x + w} ${y} Z`;
  const pl = (k: number) =>
    `M ${x + w * k} ${y + 6} C ${x + w * k + a * 0.15 * k} ${y + h * 0.4}, ${x + w * k + a * 0.4 * k} ${y + h * 0.7}, ${
      x + w * k + a * 0.75 * k
    } ${y + h - 6}`;
  return (
    <g>
      <line x1={x - 30} y1={y} x2={x + w + 30} y2={y} {...L} />
      <circle cx={x - 34} cy={y} r={7} fill="#fff" {...L} />
      <path d={d} fill={TEXTIL} fillOpacity={0.55} {...L} />
      <path d={pl(0.35)} fill="none" {...L} strokeWidth={2} />
      <path d={pl(0.68)} fill="none" {...L} strokeWidth={2} />
    </g>
  );
};

// ---------- planta que se mece ----------
export const Planta: React.FC<{ x: number; y: number; s?: number; fase?: number }> = ({ x, y, s = 1, fase = 0 }) => {
  const t = useT();
  const hojas = [
    { a: -38, l: 70 },
    { a: -12, l: 92 },
    { a: 14, l: 84 },
    { a: 40, l: 66 },
    { a: -60, l: 52 },
  ];
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {hojas.map((hj, i) => {
        const r = hj.a + 2.4 * Math.sin((2 * Math.PI * t) / 4.6 + i * 0.9 + fase);
        return (
          <g key={i} transform={`rotate(${r})`}>
            <line x1={0} y1={0} x2={0} y2={-hj.l * 0.55} {...L} strokeWidth={2.4} />
            <path
              d={`M 0 ${-hj.l * 0.45} C ${-18} ${-hj.l * 0.6}, ${-14} ${-hj.l * 0.95}, 0 ${-hj.l} C ${14} ${-hj.l * 0.95}, ${18} ${-hj.l * 0.6}, 0 ${-hj.l * 0.45} Z`}
              fill={OLIVA}
              fillOpacity={0.85}
              {...L}
              strokeWidth={2.4}
            />
          </g>
        );
      })}
      <path d="M -30 0 L 30 0 L 23 56 L -23 56 Z" fill={TEXTIL} {...L} />
      <line x1={-33} y1={0} x2={33} y2={0} {...L} />
    </g>
  );
};

// ---------- ventana (marco de madera, vidrio blanco: solo luz) ----------
export const Ventana: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={MADERA} {...L} />
    <rect x={x + 16} y={y + 16} width={w - 32} height={h - 32} fill="#FFFDF8" {...L} />
    <line x1={x + w / 2} y1={y + 16} x2={x + w / 2} y2={y + h - 16} {...L} strokeWidth={8} stroke={MADERA} />
    <line x1={x + w / 2} y1={y + 16} x2={x + w / 2} y2={y + h - 16} {...L} strokeWidth={2} />
    <line x1={x + 16} y1={y + h * 0.48} x2={x + w - 16} y2={y + h * 0.48} {...L} strokeWidth={2} />
    <line x1={x + w * 0.22} y1={y + h * 0.14} x2={x + w * 0.36} y2={y + h * 0.3} {...L} strokeWidth={2} opacity={0.5} />
    <rect x={x - 20} y={y + h} width={w + 40} height={18} fill={MADERA} {...L} />
  </g>
);

// ---------- piezas sueltas ----------
export const Cuadro: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={MADERA} {...L} />
    <rect x={x + 12} y={y + 12} width={w - 24} height={h - 24} fill="#fff" {...L} strokeWidth={2} />
    <path d={`M ${x + 22} ${y + h - 26} Q ${x + w * 0.4} ${y + h * 0.4}, ${x + w - 22} ${y + h - 30}`} fill="none" {...L} strokeWidth={2} />
  </g>
);

export const Velador: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-70} y={0} width={140} height={150} fill={MADERA} {...L} />
    <line x1={-70} y1={60} x2={70} y2={60} {...L} />
    <circle cx={0} cy={30} r={5} fill={LT} />
    <line x1={0} y1={0} x2={0} y2={-70} {...L} />
    <path d="M -38 -70 L 38 -70 L 26 -128 L -26 -128 Z" fill={ROSA} {...L} />
    <ellipse cx={0} cy={0} rx={30} ry={6} fill="#fff" {...L} strokeWidth={2} />
  </g>
);

export const Repisa: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <g>
    <rect x={x} y={y} width={w} height={14} fill={MADERA} {...L} />
    <path d={`M ${x + 30} ${y} L ${x + 30} ${y - 60} Q ${x + 30} ${y - 72} ${x + 42} ${y - 72} L ${x + 74} ${y - 72} Q ${x + 86} ${y - 72} ${x + 86} ${y - 60} L ${x + 86} ${y}`} fill={TEXTIL} {...L} />
    <rect x={x + 46} y={y - 84} width={24} height={12} rx={3} fill="#fff" {...L} strokeWidth={2} />
    <path d={`M ${x + 120} ${y} L ${x + 124} ${y - 44} L ${x + 166} ${y - 44} L ${x + 170} ${y} Z`} fill={ROSA} {...L} />
    <path d={`M ${x + 170} ${y - 34} q 20 4 0 22`} fill="none" {...L} strokeWidth={2.5} />
  </g>
);

const Lienzo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill="#FFFEFE" />
    {children}
  </svg>
);

// Dormitorio de lado (escena 3)
export const FondoDormitorio: React.FC = () => (
  <Lienzo>
    <line x1={0} y1={1490} x2={W} y2={1490} {...L} />
    <line x1={0} y1={1512} x2={W} y2={1512} {...L} strokeWidth={2} opacity={0.6} />
    {[1600, 1720, 1860].map((y) => (
      <line key={y} x1={0} y1={y} x2={W} y2={y + 40} {...L} strokeWidth={2} opacity={0.35} />
    ))}
    <Cuadro x={90} y={700} w={190} h={150} />
    <Ventana x={720} y={640} w={280} h={500} />
    <Cortina x={660} y={612} w={120} h={600} />
    <Planta x={930} y={1140} s={0.8} fase={1} />
  </Lienzo>
);

// Cocina (escenas 4 y 5): la imagen de Dani trae mesón y piso
export const FondoCocina: React.FC = () => (
  <Lienzo>
    <Repisa x={110} y={760} w={260} />
    <Ventana x={780} y={640} w={240} h={440} />
    <Cortina x={720} y={612} w={110} h={520} fase={0.6} />
  </Lienzo>
);

// Cocina amplia (escena 6): Dani queda pequeña
export const FondoCocinaAmplia: React.FC = () => (
  <Lienzo>
    <line x1={0} y1={1590} x2={W} y2={1590} {...L} />
    <Ventana x={620} y={760} w={300} h={400} />
    <Cortina x={560} y={732} w={110} h={480} fase={1.2} />
    <Repisa x={120} y={900} w={260} />
    <rect x={540} y={1280} width={560} height={310} fill="#fff" {...L} />
    <rect x={540} y={1280} width={560} height={34} fill={MADERA} {...L} />
    <line x1={820} y1={1314} x2={820} y2={1590} {...L} />
    <line x1={795} y1={1420} x2={795} y2={1460} {...L} />
    <line x1={845} y1={1420} x2={845} y2={1460} {...L} />
    <Planta x={1010} y={1224} s={0.75} fase={2} />
  </Lienzo>
);

// Junto a la ventana (escena 7 y cierre)
export const FondoVentanaGrande: React.FC = () => (
  <Lienzo>
    <line x1={0} y1={1760} x2={W} y2={1760} {...L} />
    <line x1={0} y1={1782} x2={W} y2={1782} {...L} strokeWidth={2} opacity={0.6} />
    <Ventana x={640} y={620} w={360} h={760} />
    <Cortina x={560} y={592} w={130} h={880} fase={0.3} />
    <Planta x={940} y={1380} s={0.9} fase={0.7} />
  </Lienzo>
);
