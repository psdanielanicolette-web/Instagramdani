import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { COLOR, FPS, H, W } from "./tokens";

// ---------- Polvo en la luz: partículas cálidas que suben y titilan ----------
export const Polvo: React.FC<{
  n?: number;
  zona?: { x: number; y: number; w: number; h: number };
  semilla?: string;
}> = ({ n = 85, zona = { x: 380, y: 500, w: 700, h: 1200 }, semilla = "polvo" }) => {
  const t = useCurrentFrame() / FPS;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: n }).map((_, i) => {
        const r0 = random(`${semilla}-x${i}`);
        const r1 = random(`${semilla}-y${i}`);
        const v = 6 + random(`${semilla}-v${i}`) * 14; // px por segundo
        const tam = 1.2 + random(`${semilla}-r${i}`) * 2.6;
        const fase = random(`${semilla}-f${i}`) * Math.PI * 2;
        const x = zona.x + r0 * zona.w + Math.sin(t * 0.6 + fase) * 8;
        const yy = zona.y + ((r1 * zona.h - t * v) % zona.h + zona.h) % zona.h;
        const o = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7 + fase));
        return <circle key={i} cx={x} cy={yy} r={tam} fill="#E9C9A0" opacity={o} />;
      })}
    </svg>
  );
};

// ---------- Haz de luz que respira (y puede viajar) ----------
export const HazDeLuz: React.FC<{
  puntos: string; // polígono del haz
  viaje?: { desde: number; hasta: number; dx: number }; // desplazamiento en s
  intensidad?: number;
}> = ({ puntos, viaje, intensidad = 0.55 }) => {
  const t = useCurrentFrame() / FPS;
  const respira = 1 + 0.05 * Math.sin((t / 6.5) * Math.PI * 2);
  const dx = viaje
    ? interpolate(t, [viaje.desde, viaje.hasta], [0, viaje.dx], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply" }}>
      <defs>
        <linearGradient id="haz" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COLOR.luz} stopOpacity={0.95} />
          <stop offset="1" stopColor={COLOR.luz} stopOpacity={0} />
        </linearGradient>
        <filter id="suave">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <polygon
        points={puntos}
        fill="url(#haz)"
        opacity={intensidad * respira}
        filter="url(#suave)"
        transform={`translate(${dx},0)`}
      />
    </svg>
  );
};

// ---------- Vapor en line art: tres trazos finos que suben ----------
export const Vapor: React.FC<{ x: number; y: number; escala?: number }> = ({ x, y, escala = 1 }) => {
  const t = useCurrentFrame() / FPS;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      {[-1, 0, 1].map((k) => {
        const fase = (t * 0.45 + k * 0.33 + 1) % 1; // ciclo de subida
        const alto = 70 * escala;
        const y0 = y - fase * 40 * escala;
        const ox = x + k * 12 * escala;
        const w = Math.sin(t * 2 + k) * 6 * escala;
        const d = `M ${ox} ${y0} C ${ox + 8 * escala + w} ${y0 - alto * 0.33}, ${ox - 8 * escala - w} ${
          y0 - alto * 0.66
        }, ${ox + w} ${y0 - alto}`;
        const o = Math.sin(fase * Math.PI) * 0.55;
        return (
          <path key={k} d={d} stroke={COLOR.tinta} strokeWidth={1.6 * escala} fill="none" strokeLinecap="round" opacity={o} />
        );
      })}
    </svg>
  );
};
