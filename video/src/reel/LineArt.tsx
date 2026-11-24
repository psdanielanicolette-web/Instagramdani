import React from "react";
import { useCurrentFrame } from "remotion";
import { FPS, H, W } from "./tokens";

// Fondos dibujados en Remotion, estilo de las referencias (assets/referencias/fondos/):
// línea negra uniforme de 3 px, blanco predominante, color de marca por objeto
// (madera #D7B18F · textiles #EED3BB/#F4D5DC · plantas #3F4A3A · cerámica #EED3BB).
// REGLA: ningún dibujo sube de y = ZONA_ESCENA (el texto vive arriba, en blanco).

export const ZONA_ESCENA = 780;
export const LT = "#2D2825";
export const MADERA = "#D7B18F";
export const TEXTIL = "#EED3BB";
export const ROSA = "#F4D5DC";
export const OLIVA = "#3F4A3A";
const L = { stroke: LT, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const L2 = { ...L, strokeWidth: 2 };

const useT = () => useCurrentFrame() / FPS;

// ---------- cortina que ondula, lenta (anclada en la barra) ----------
export const Cortina: React.FC<{ x: number; y: number; w: number; h: number; fase?: number }> = ({ x, y, w, h, fase = 0 }) => {
  const t = useT();
  const a = 7 * Math.sin((2 * Math.PI * t) / 6.5 + fase) + 2 * Math.sin((2 * Math.PI * t) / 3.1 + fase);
  const b = a * 0.6;
  const d = `M ${x} ${y}
    C ${x + a * 0.2} ${y + h * 0.35}, ${x - 6 + a * 0.6} ${y + h * 0.7}, ${x + a} ${y + h}
    Q ${x + w * 0.25 + a} ${y + h + 10}, ${x + w * 0.5 + b} ${y + h - 4}
    Q ${x + w * 0.75 + b} ${y + h + 8}, ${x + w + b * 0.5} ${y + h}
    C ${x + w + 4 + b * 0.4} ${y + h * 0.7}, ${x + w - 2 + b * 0.2} ${y + h * 0.35}, ${x + w} ${y} Z`;
  const pl = (k: number) =>
    `M ${x + w * k} ${y + 8} C ${x + w * k + a * 0.15 * k} ${y + h * 0.4}, ${x + w * k + a * 0.4 * k} ${y + h * 0.7}, ${
      x + w * k + a * 0.75 * k
    } ${y + h - 8}`;
  return (
    <g>
      <line x1={x - 24} y1={y} x2={x + w + 24} y2={y} {...L} />
      <circle cx={x - 28} cy={y} r={6} fill="#fff" {...L} />
      <path d={d} fill={TEXTIL} fillOpacity={0.6} {...L} />
      <path d={pl(0.35)} fill="none" {...L2} />
      <path d={pl(0.68)} fill="none" {...L2} />
    </g>
  );
};

// ---------- planta que se mece, lenta ----------
export const Planta: React.FC<{ x: number; y: number; s?: number; fase?: number; maceta?: string }> = ({
  x,
  y,
  s = 1,
  fase = 0,
  maceta = TEXTIL,
}) => {
  const t = useT();
  const hojas = [
    { a: -40, l: 72 },
    { a: -14, l: 96 },
    { a: 12, l: 88 },
    { a: 38, l: 70 },
    { a: -64, l: 54 },
    { a: 62, l: 52 },
  ];
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {hojas.map((hj, i) => {
        const r = hj.a + 2 * Math.sin((2 * Math.PI * t) / 6 + i * 0.9 + fase);
        return (
          <g key={i} transform={`rotate(${r})`}>
            <line x1={0} y1={0} x2={0} y2={-hj.l * 0.5} {...L2} />
            <path
              d={`M 0 ${-hj.l * 0.42} C -19 ${-hj.l * 0.6}, -15 ${-hj.l * 0.95}, 0 ${-hj.l} C 15 ${-hj.l * 0.95}, 19 ${-hj.l * 0.6}, 0 ${-hj.l * 0.42} Z`}
              fill={OLIVA}
              fillOpacity={0.8}
              {...L2}
            />
            <line x1={0} y1={-hj.l * 0.5} x2={0} y2={-hj.l * 0.9} stroke="#fff" strokeWidth={1.2} opacity={0.6} />
          </g>
        );
      })}
      <path d="M -32 0 L 32 0 L 24 58 L -24 58 Z" fill={maceta} {...L} />
      <line x1={-35} y1={0} x2={35} y2={0} {...L} />
    </g>
  );
};

// ---------- ventana: marco de madera, por ella solo luz ----------
export const Ventana: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={MADERA} {...L} />
    <rect x={x + 16} y={y + 16} width={w - 32} height={h - 32} fill="#FFFDF8" {...L} />
    <rect x={x + w / 2 - 5} y={y + 16} width={10} height={h - 32} fill={MADERA} {...L2} />
    <rect x={x + 16} y={y + h * 0.48 - 5} width={w - 32} height={10} fill={MADERA} {...L2} />
    <line x1={x + w * 0.2} y1={y + h * 0.12} x2={x + w * 0.34} y2={y + h * 0.26} {...L2} opacity={0.45} />
    <line x1={x + w * 0.68} y1={y + h * 0.6} x2={x + w * 0.8} y2={y + h * 0.72} {...L2} opacity={0.45} />
    <rect x={x - 22} y={y + h} width={w + 44} height={18} fill={MADERA} {...L} />
  </g>
);

export const Cuadro: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={MADERA} {...L} />
    <rect x={x + 12} y={y + 12} width={w - 24} height={h - 24} fill="#fff" {...L2} />
    <path d={`M ${x + 22} ${y + h - 24} L ${x + w * 0.42} ${y + h * 0.45} L ${x + w * 0.6} ${y + h * 0.62} L ${x + w * 0.74} ${y + h * 0.5} L ${x + w - 22} ${y + h - 24}`} fill="none" {...L2} />
    <circle cx={x + w * 0.72} cy={y + h * 0.32} r={9} fill={ROSA} {...L2} />
  </g>
);

export const Lampara: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={28} ry={7} fill="#fff" {...L2} />
    <line x1={0} y1={0} x2={0} y2={-66} {...L} />
    <path d="M -40 -66 L 40 -66 L 28 -124 L -28 -124 Z" fill={ROSA} {...L} />
  </g>
);

// velador visto de frente (para primer plano)
export const VeladorFrente: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-95} y={0} width={190} height={210} fill={MADERA} {...L} />
    <rect x={-80} y={20} width={160} height={70} fill={MADERA} {...L2} />
    <circle cx={0} cy={55} r={6} fill={LT} />
    <rect x={-80} y={110} width={160} height={80} fill="#fff" {...L2} />
    <rect x={-60} y={150} width={60} height={14} fill={ROSA} {...L2} />
    <rect x={-56} y={136} width={52} height={14} fill="#fff" {...L2} />
    <Lampara x={10} y={0} s={1.1} />
  </g>
);

export const Repisa: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <g>
    <rect x={x} y={y} width={w} height={14} fill={MADERA} {...L} />
    <path d={`M ${x + 26} ${y} L ${x + 26} ${y - 58} Q ${x + 26} ${y - 70} ${x + 38} ${y - 70} L ${x + 70} ${y - 70} Q ${x + 82} ${y - 70} ${x + 82} ${y - 58} L ${x + 82} ${y}`} fill={TEXTIL} {...L} />
    <rect x={x + 42} y={y - 82} width={24} height={12} rx={3} fill="#fff" {...L2} />
    <path d={`M ${x + 114} ${y} L ${x + 118} ${y - 42} L ${x + 160} ${y - 42} L ${x + 164} ${y} Z`} fill={ROSA} {...L} />
    <path d={`M ${x + 164} ${y - 32} q 20 4 0 22`} fill="none" {...L} strokeWidth={2.5} />
    <Planta x={x + w - 40} y={y - 46} s={0.5} fase={2.2} />
  </g>
);

const Lienzo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill="#FFFEFE" />
    {children}
  </svg>
);

// ===================== FONDOS =====================

// Escenas 1-2 · dormitorio visto desde arriba (la cama de Dani va encima)
export const FondoDormitorioArriba: React.FC = () => (
  <Lienzo>
    {/* esquina del cuarto: pared del fondo y piso */}
    <line x1={0} y1={1040} x2={640} y2={820} {...L} />
    <line x1={640} y1={820} x2={1080} y2={1000} {...L} />
    <line x1={640} y1={820} x2={640} y2={ZONA_ESCENA} {...L} />
    {/* tablas del piso en diagonal */}
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={i} x1={-200 + i * 150} y1={1060 + i * 52} x2={1080} y2={1060 + i * 52 - 640 + 0} {...L2} opacity={0} />
    ))}
    {Array.from({ length: 10 }).map((_, i) => (
      <line key={`p${i}`} x1={i * 130 - 120} y1={1920} x2={i * 130 + 520} y2={1050} {...L2} opacity={0.28} />
    ))}
    {/* ventana con cortina en la pared derecha */}
    <g transform="translate(760,830) skewY(22)">
      <Ventana x={0} y={0} w={220} h={150} />
    </g>
    <Cortina x={712} y={842} w={60} h={210} fase={0.4} />
    {/* alfombra bajo la cama */}
    <polygon points="200,1250 760,1090 1060,1420 480,1640" fill={ROSA} fillOpacity={0.35} {...L} />
    <polygon points="232,1258 756,1110 1028,1412 488,1612" fill="none" {...L2} opacity={0.6} />
    {/* planta en el piso */}
    <Planta x={980} y={1240} s={0.95} fase={1.1} />
  </Lienzo>
);

// Escena 3 · dormitorio de lado
export const FondoDormitorioLado: React.FC = () => (
  <Lienzo>
    <line x1={0} y1={1560} x2={W} y2={1560} {...L} />
    <line x1={0} y1={1582} x2={W} y2={1582} {...L2} opacity={0.6} />
    {[1660, 1760, 1880].map((y, i) => (
      <line key={y} x1={0} y1={y} x2={W} y2={y + 30 + i * 6} {...L2} opacity={0.3} />
    ))}
    <Cuadro x={120} y={880} w={200} h={160} />
    <Ventana x={700} y={830} w={300} h={470} />
    <Cortina x={640} y={806} w={120} h={560} fase={0.2} />
    <Planta x={930} y={1300} s={0.75} fase={1.4} />
  </Lienzo>
);
// primer plano de la escena 3 (va DELANTE de Dani: tapa el borde de la cama)
export const PrimerPlanoDormitorio: React.FC = () => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <VeladorFrente x={70} y={1500} s={1.05} />
  </svg>
);

// Escenas 4-5 · cocina (la imagen de Dani trae el mesón; el piso calza con el suyo)
export const FondoCocina: React.FC<{ pisoY: number }> = ({ pisoY }) => (
  <Lienzo>
    <rect x={0} y={pisoY} width={W} height={H - pisoY} fill="#F1E2D0" />
    <line x1={0} y1={pisoY} x2={W} y2={pisoY} {...L} />
    <Repisa x={90} y={930} w={300} />
    <Ventana x={730} y={830} w={260} h={360} />
    <Cortina x={672} y={806} w={110} h={430} fase={0.6} />
  </Lienzo>
);

// Escena 6 · cocina amplia (Dani pequeña)
export const FondoCocinaAmplia: React.FC = () => (
  <Lienzo>
    <rect x={0} y={1650} width={W} height={H - 1650} fill="#F1E2D0" />
    <line x1={0} y1={1650} x2={W} y2={1650} {...L} />
    <Ventana x={620} y={850} w={290} h={360} />
    <Cortina x={562} y={826} w={110} h={430} fase={1.2} />
    <Repisa x={110} y={1000} w={280} />
    <rect x={540} y={1360} width={560} height={290} fill="#fff" {...L} />
    <rect x={540} y={1360} width={560} height={34} fill={MADERA} {...L} />
    <line x1={820} y1={1394} x2={820} y2={1650} {...L} />
    <line x1={795} y1={1490} x2={795} y2={1530} {...L} />
    <line x1={845} y1={1490} x2={845} y2={1530} {...L} />
    <path d="M 640 1360 L 640 1318 Q 640 1306 652 1306 L 690 1306 Q 702 1306 702 1318 L 702 1360" fill={ROSA} {...L} />
    <Planta x={1010} y={1302} s={0.72} fase={2} />
  </Lienzo>
);

// Escena 7 y cierre · junto a la ventana
export const FondoVentanaGrande: React.FC = () => (
  <Lienzo>
    <line x1={0} y1={1780} x2={W} y2={1780} {...L} />
    <line x1={0} y1={1802} x2={W} y2={1802} {...L2} opacity={0.6} />
    <Ventana x={640} y={820} w={360} h={700} />
    <Cortina x={560} y={796} w={130} h={820} fase={0.3} />
    <Planta x={940} y={1520} s={0.9} fase={0.7} />
  </Lienzo>
);
