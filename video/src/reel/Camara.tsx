import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FPS, H, W } from "./tokens";

// Fotograma clave de cámara: t en segundos (relativo al plano),
// x/y = punto del cuadro que queda al centro, z = zoom (máx. 1,3).
export type Clave = { t: number; x: number; y: number; z: number };

export const Camara: React.FC<{
  claves: Clave[];
  deriva?: number; // amplitud de la deriva leve, px
  filtro?: string;
  children: React.ReactNode;
}> = ({ claves, deriva = 6, filtro, children }) => {
  const t = useCurrentFrame() / FPS;
  const ts = claves.map((c) => c.t);
  const op = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: Easing.inOut(Easing.cubic),
  };
  const x = claves.length > 1 ? interpolate(t, ts, claves.map((c) => c.x), op) : claves[0].x;
  const y = claves.length > 1 ? interpolate(t, ts, claves.map((c) => c.y), op) : claves[0].y;
  const z = Math.min(1.3, claves.length > 1 ? interpolate(t, ts, claves.map((c) => c.z), op) : claves[0].z);
  // deriva sinusoidal para que el cuadro nunca quede muerto
  const dx = Math.sin(t * 0.7) * deriva;
  const dy = Math.cos(t * 0.53) * deriva * 0.6;
  // al centrar (x, y) con zoom z se evita mostrar fuera del cuadro
  const tx = Math.max(Math.min(W / 2 - x * z, 0), W - W * z) + dx;
  const ty = Math.max(Math.min(H / 2 - y * z, 0), H - H * z) + dy;
  return (
    <AbsoluteFill style={{ overflow: "hidden", filter: filtro }}>
      <AbsoluteFill
        style={{
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${z * 1.012})`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
