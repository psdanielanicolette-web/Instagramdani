import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLOR, FPS, H, W } from "./tokens";

// Intro aprobada (1,7 s, blanco y negro): persiana cerrada → se abre desde el
// centro → en el hueco aparece el obturador de 8 hojas → se abre y revela la escena.
// Se monta ENCIMA del primer plano, que ya está en movimiento debajo.
const LAMINAS_ARRIBA = 15;
const LAMINAS_ABAJO = 12;
const CUERDAS = [0.12, 0.4, 0.72];

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const MitadPersiana: React.FC<{ n: number; alto: number; arriba: boolean; apriete: number }> = ({
  n,
  alto,
  arriba,
  apriete,
}) => {
  // las láminas se aprietan contra el borde a medida que la persiana se recoge
  const paso = (alto / n) * (1 - apriete * 0.82);
  return (
    <svg width={W} height={alto} style={{ display: "block" }}>
      <rect width={W} height={alto} fill={COLOR.persianaLamina} />
      {Array.from({ length: n + 1 }).map((_, i) => {
        const y = arriba ? i * paso : alto - i * paso;
        return <line key={i} x1={0} x2={W} y1={y} y2={y} stroke={COLOR.tinta} strokeWidth={1.4} opacity={0.75} />;
      })}
      {CUERDAS.map((c, i) => (
        <line key={`c${i}`} x1={c * W} x2={c * W} y1={0} y2={alto} stroke={COLOR.tinta} strokeWidth={0.8} opacity={0.45} />
      ))}
    </svg>
  );
};

export const Intro: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t > 1.7) return null;

  // 1) persiana: abre desde 0,12 s, recogida a 1,25 s
  const abre = interpolate(t, [0.12, 1.25], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const altoArriba = (H / 2) * (1 - abre * 0.97);
  const altoAbajo = (H / 2) * (1 - abre * 0.97);

  // 2) obturador: aparece cerrado desde 0,3 s, abre de 0,5 a 1,05 s
  const obturadorVisible = t >= 0.28;
  const apertura = interpolate(t, [0.5, 1.05], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const R = apertura * 1250; // radio del hueco
  const giro = apertura * 40; // grados
  const cx = W / 2;
  const cy = H / 2;
  const vertices = Array.from({ length: 8 }).map((_, i) => {
    const a = ((i * 45 + giro) * Math.PI) / 180;
    return [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
  });
  const hueco = vertices.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <AbsoluteFill>
      {obturadorVisible && apertura < 1 && (
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <mask id="hueco">
              <rect width={W} height={H} fill="white" />
              {R > 0 && <polygon points={hueco} fill="black" />}
            </mask>
          </defs>
          <rect width={W} height={H} fill={COLOR.persianaLamina} mask="url(#hueco)" />
          {/* bordes de las 8 hojas: líneas tangentes desde cada vértice */}
          {vertices.map(([x, y], i) => {
            const a = ((i * 45 + giro + 112) * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={R > 0 ? x : cx}
                y1={R > 0 ? y : cy}
                x2={(R > 0 ? x : cx) + Math.cos(a) * 1800}
                y2={(R > 0 ? y : cy) + Math.sin(a) * 1800}
                stroke={COLOR.tinta}
                strokeWidth={1.3}
                opacity={0.8}
              />
            );
          })}
        </svg>
      )}
      {/* mitad de arriba (sube) con cordón y borla */}
      <div style={{ position: "absolute", top: 0, left: 0, width: W, height: altoArriba, overflow: "hidden" }}>
        <MitadPersiana n={LAMINAS_ARRIBA} alto={H / 2} arriba apriete={abre} />
        <svg width={W} height={H / 2} style={{ position: "absolute", top: 0, left: 0 }}>
          <line x1={0.06 * W} x2={0.06 * W} y1={0} y2={altoArriba - 40} stroke={COLOR.tinta} strokeWidth={1.2} />
          <rect x={0.06 * W - 7} y={altoArriba - 42} width={14} height={30} rx={6} fill={COLOR.persianaLamina} stroke={COLOR.tinta} strokeWidth={1.4} />
        </svg>
      </div>
      {/* mitad de abajo (baja) */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: W, height: altoAbajo, overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0 }}>
          <MitadPersiana n={LAMINAS_ABAJO} alto={H / 2} arriba={false} apriete={abre} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
