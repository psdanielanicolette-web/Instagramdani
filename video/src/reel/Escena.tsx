import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLOR, FPS, H, W } from "./tokens";

const L = { stroke: COLOR.tinta, strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const Lfina = { ...L, strokeWidth: 1.3, opacity: 0.35 };

// ---------------------------------------------------------------------------
// Plano visible entre [desde, hasta] (s absolutos) con fundidos opcionales
// ---------------------------------------------------------------------------
export const Plano: React.FC<{
  desde: number;
  hasta: number;
  fundidoEntrada?: number;
  fundidoSalida?: number;
  children: React.ReactNode;
}> = ({ desde, hasta, fundidoEntrada = 0, fundidoSalida = 0, children }) => {
  const t = useCurrentFrame() / FPS;
  if (t < desde || t >= hasta) return null;
  let o = 1;
  if (fundidoEntrada > 0) o = Math.min(o, interpolate(t, [desde, desde + fundidoEntrada], [0, 1], { extrapolateRight: "clamp" }));
  if (fundidoSalida > 0) o = Math.min(o, interpolate(t, [hasta - fundidoSalida, hasta], [1, 0], { extrapolateLeft: "clamp" }));
  return <AbsoluteFill style={{ backgroundColor: COLOR.fondo, opacity: o }}>{children}</AbsoluteFill>;
};

// ---------------------------------------------------------------------------
// Dani: varias imágenes de la misma pose (A, B, C…) con fundidos entre ellas,
// respiración sutil y colocación (k = escala sobre el cuadro completo).
// ---------------------------------------------------------------------------
export type Cambio = { t: number; a: number; dur?: number }; // en t, pasa a la imagen `a`

export const Dani: React.FC<{
  imagenes: string[];
  cambios?: Cambio[];
  k?: number;
  x?: number;
  y?: number;
  respira?: boolean;
  hombros?: { t: number; px: number }; // descenso leve del torso al exhalar
}> = ({ imagenes, cambios = [], k = 1, x = 0, y = 0, respira = true, hombros }) => {
  const t = useCurrentFrame() / FPS;
  // capas apiladas: la imagen base y, encima, cada cambio con su fundido.
  // Como las imágenes A/B están alineadas, la capa superior tapa a las de abajo.
  const capas: { src: string; o: number }[] = [{ src: imagenes[0], o: 1 }];
  for (const c of cambios) {
    const d = c.dur ?? 0.5;
    const p = interpolate(t, [c.t, c.t + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (p <= 0) break;
    if (p >= 1) capas.length = 0; // lo de abajo ya no se ve
    capas.push({ src: imagenes[c.a], o: p });
  }
  const resp = respira ? 1 + 0.0045 * Math.sin((t / 4.2) * Math.PI * 2) : 1;
  const baja = hombros
    ? interpolate(t, [hombros.t, hombros.t + 0.9], [0, hombros.px], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  return (
    <AbsoluteFill
      style={{
        transformOrigin: "50% 100%",
        transform: `translate(${x}px, ${y + baja}px) scale(${k}) scaleY(${resp})`,
      }}
    >
      {capas.map((c, i) => (
        <Img
          key={`${c.src}-${i}`}
          src={staticFile(`dani/${c.src}`)}
          style={{ position: "absolute", inset: 0, width: W, height: H, opacity: c.o }}
        />
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Fondos line art · predomina el blanco, detalles mínimos de color
// ---------------------------------------------------------------------------
const Ventana: React.FC<{ x: number; y: number; w: number; h: number; cortina?: boolean }> = ({ x, y, w, h, cortina = true }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} {...L} fill="#FFFBF4" />
    <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} {...L} strokeWidth={1.6} />
    <line x1={x + w / 2} y1={y + 14} x2={x + w / 2} y2={y + h - 14} {...L} strokeWidth={1.6} />
    <line x1={x + 14} y1={y + h * 0.46} x2={x + w - 14} y2={y + h * 0.46} {...L} strokeWidth={1.6} />
    <rect x={x - 18} y={y + h} width={w + 36} height={16} {...L} fill={COLOR.fondo} strokeWidth={2} />
    {cortina && (
      <g>
        <path
          d={`M ${x - 30} ${y - 26} C ${x - 6} ${y + h * 0.3}, ${x - 40} ${y + h * 0.6}, ${x - 10} ${y + h + 40} L ${x + w * 0.2} ${y + h + 40} C ${x + w * 0.12} ${y + h * 0.6}, ${x + w * 0.24} ${y + h * 0.3}, ${x + w * 0.16} ${y - 26} Z`}
          fill={COLOR.beige}
          opacity={0.32}
        />
        <path d={`M ${x - 30} ${y - 26} C ${x - 6} ${y + h * 0.3}, ${x - 40} ${y + h * 0.6}, ${x - 10} ${y + h + 40}`} {...L} strokeWidth={1.5} />
        <path d={`M ${x + w * 0.16} ${y - 26} C ${x + w * 0.24} ${y + h * 0.3}, ${x + w * 0.12} ${y + h * 0.6}, ${x + w * 0.2} ${y + h + 40}`} {...L} strokeWidth={1.5} />
        <line x1={x - 60} y1={y - 26} x2={x + w + 40} y2={y - 26} {...L} strokeWidth={2} />
      </g>
    )}
  </g>
);

const Planta: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -22 0 L 22 0 L 16 44 L -16 44 Z" fill="#E9D3BC" opacity={0.6} />
    <path d="M -22 0 L 22 0 L 16 44 L -16 44 Z" {...L} strokeWidth={1.8} />
    <path d="M 0 0 C -4 -30, -26 -44, -36 -60 M 0 0 C 4 -34, 22 -50, 30 -74 M 0 0 C 0 -26, 2 -52, -4 -84" {...L} strokeWidth={1.6} stroke="#3F4A3A" />
  </g>
);

// Dormitorio visto desde arriba (planos 1–2): piso, alfombra y velador
export const FondoDormitorioArriba: React.FC = () => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill={COLOR.fondo} />
    {Array.from({ length: 22 }).map((_, i) => {
      const o = -900 + i * 120;
      return <line key={i} x1={o} y1={0} x2={o + 1600} y2={H + 0} {...Lfina} opacity={0.14} />;
    })}
    <polygon points="560,520 1180,880 520,1700 -100,1340" fill={COLOR.beige} opacity={0.22} />
    <polygon points="560,520 1180,880 520,1700 -100,1340" {...L} strokeWidth={1.5} opacity={0.5} />
    {/* velador con lámpara */}
    <g transform="translate(905,520)">
      <polygon points="0,0 90,52 0,104 -90,52" {...L} fill={COLOR.fondo} strokeWidth={1.8} />
      <path d="M -90 52 L -90 120 L 0 172 L 0 104 M 0 172 L 90 120 L 90 52" {...L} strokeWidth={1.8} />
      <ellipse cx={0} cy={44} rx={30} ry={17} fill={COLOR.beige} opacity={0.45} />
      <ellipse cx={0} cy={44} rx={30} ry={17} {...L} strokeWidth={1.5} />
    </g>
  </svg>
);

// Dormitorio de lado (plano 3): pared, zócalo, ventana con cortina, planta
export const FondoDormitorioLado: React.FC = () => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill={COLOR.fondo} />
    <line x1={0} y1={1480} x2={W} y2={1480} {...L} strokeWidth={1.8} />
    <line x1={0} y1={1500} x2={W} y2={1500} {...Lfina} />
    <Ventana x={760} y={560} w={270} h={560} />
    <Planta x={900} y={1104} s={0.9} />
  </svg>
);

// Cocina (planos 4–5): la imagen trae mesón y piso; aquí, pared con ventana y repisa
export const FondoCocina: React.FC = () => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill={COLOR.fondo} />
    <Ventana x={800} y={560} w={230} h={480} cortina={false} />
    <line x1={130} y1={560} x2={430} y2={560} {...L} strokeWidth={2} />
    <g transform="translate(180,560)">
      <path d="M 0 0 L 0 -46 Q 0 -54 8 -54 L 30 -54 Q 38 -54 38 -46 L 38 0" fill="#EFE2D2" opacity={0.6} />
      <path d="M 0 0 L 0 -46 Q 0 -54 8 -54 L 30 -54 Q 38 -54 38 -46 L 38 0" {...L} strokeWidth={1.6} />
      <path d="M 70 0 L 70 -34 L 100 -34 L 100 0" {...L} strokeWidth={1.6} />
      <circle cx={160} cy={-22} r={22} {...L} strokeWidth={1.6} />
    </g>
  </svg>
);

// Cocina amplia (plano 6): mesón en line art, ventana; Dani queda pequeña
export const FondoCocinaAmplia: React.FC = () => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill={COLOR.fondo} />
    <line x1={0} y1={1560} x2={W} y2={1560} {...L} strokeWidth={1.8} />
    <Ventana x={640} y={720} w={300} h={420} cortina={false} />
    <rect x={560} y={1250} width={540} height={310} fill="#F3E6D6" opacity={0.55} />
    <rect x={560} y={1250} width={540} height={310} {...L} />
    <line x1={560} y1={1282} x2={1100} y2={1282} {...L} strokeWidth={1.6} />
    <line x1={830} y1={1282} x2={830} y2={1560} {...L} strokeWidth={1.6} />
    <line x1={805} y1={1400} x2={805} y2={1440} {...L} strokeWidth={2} />
    <line x1={855} y1={1400} x2={855} y2={1440} {...L} strokeWidth={2} />
    <Planta x={1010} y={1206} s={0.75} />
  </svg>
);

// Junto a la ventana (plano 7)
export const FondoVentana: React.FC = () => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <rect width={W} height={H} fill={COLOR.fondo} />
    <line x1={0} y1={1720} x2={W} y2={1720} {...L} strokeWidth={1.8} />
    <line x1={0} y1={1740} x2={W} y2={1740} {...Lfina} />
    <Ventana x={660} y={520} w={340} h={820} />
  </svg>
);
