import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Camara } from "../reel/Camara";
import { HazDeLuz, Vapor } from "../reel/Contexto";
import { Dani, Plano } from "../reel/Escena";
import { Frase } from "../reel/Frase";
import { Intro } from "../reel/Intro";
import { FondoCocina, FondoCocinaAmplia, FondoDormitorio, FondoVentanaGrande } from "../reel/LineArt";
import { FPS } from "../reel/tokens";

// Reel 2 · Burnout · "funcionar sin estar"
// Guion: guiones/REEL2_GUION_PRODUCCION_SIMPLE.md (texto validado por Teo).
// Tiempos en segundos absolutos del reel.
export const DURACION_R2 = 44.4;

const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// ---------------------------------------------------------------------------
// Escena aprobada de la cama (Flow), separada en capas: tools/capas_escena.py
// Imagen 756x1344 → 1080x1920 (×1,428571), bajada 300 px: arriba queda el
// espacio en blanco para el texto.
// ---------------------------------------------------------------------------
const S = 1080 / 756;
const OY = 300;
const caja = (x: number, y: number, w: number, h: number): React.CSSProperties => ({
  position: "absolute",
  left: x * S,
  top: y * S + OY,
  width: w * S,
  height: h * S,
});

const EscenaCama: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const cortina = 1.6 * Math.sin((2 * Math.PI * t) / 5) + 0.5 * Math.sin((2 * Math.PI * t) / 2.3);
  const planta = 1.8 * Math.sin((2 * Math.PI * t) / 4.6 + 0.8);
  const resp = 1 + 0.006 * (0.5 - 0.5 * Math.cos((2 * Math.PI * t) / 4.2));
  // ojos: cerrados (fin de semana) → entreabiertos (7,7 s) → abiertos (9,0 s)
  const cerrados = 1 - interpolate(t, [7.7, 8.2], [0, 1], cl);
  const abiertos = interpolate(t, [9.0, 9.4], [0, 1], cl);
  return (
    <AbsoluteFill>
      <Img src={staticFile("escenas/cama/fondo.png")} style={caja(0, 0, 756, 1344)} />
      <Img
        src={staticFile("escenas/cama/respira.png")}
        style={{ ...caja(300, 430, 320, 260), transformOrigin: "50% 100%", transform: `scale(${resp}, ${1 + (resp - 1) * 1.4})` }}
      />
      <Img src={staticFile("escenas/cama/ojos_cerrados.png")} style={{ ...caja(470, 468, 80, 80), opacity: cerrados }} />
      <Img src={staticFile("escenas/cama/ojos_abiertos.png")} style={{ ...caja(470, 468, 80, 80), opacity: abiertos }} />
      <Img
        src={staticFile("escenas/cama/cortina.png")}
        style={{ ...caja(540, 88, 78, 340), transformOrigin: "50% 0%", transform: `skewX(${cortina}deg)` }}
      />
      <Img
        src={staticFile("escenas/cama/planta.png")}
        style={{ ...caja(690, 470, 66, 170), transformOrigin: "30% 100%", transform: `rotate(${planta}deg)` }}
      />
    </AbsoluteFill>
  );
};

const FRASES: { texto: string; desde: number; hasta: number }[] = [
  { texto: "Dormí todo el fin de semana.", desde: 0.9, hasta: 5.7 },
  { texto: "Llegó el lunes", desde: 6.7, hasta: 9.0 },
  { texto: "y amanecí igual de vacía.", desde: 9.2, hasta: 12.3 },
  { texto: "No es sueño atrasado.", desde: 12.7, hasta: 15.5 },
  { texto: "Dormir no lo repone.", desde: 15.7, hasta: 18.7 },
  { texto: "Estoy funcionando —", desde: 19.1, hasta: 23.4 },
  // 23,6–26,0: respiro sin texto (la taza)
  { texto: "pero no estoy.", desde: 26.7, hasta: 30.8 },
  { texto: "Quizá no necesito descansar más.", desde: 31.4, hasta: 34.3 },
  { texto: "Quizá esto que cargo tiene otra forma,", desde: 34.5, hasta: 37.4 },
];

export const Reel2Burnout: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  // la luz baja un momento entre el fin de semana y el lunes
  const apagon = t < 6.2 ? interpolate(t, [5.8, 6.2], [0, 1], cl) : interpolate(t, [6.2, 6.7], [1, 0], cl);
  // mundo interno (31,4 s) y cierre (37,6 s): veladura cálida, nunca gris
  const interno = interpolate(t, [31.4, 33.0], [0, 1], cl);
  const cierre = interpolate(t, [37.6, 38.8], [0, 1], cl);
  const velo = Math.max(0.35 * apagon, 0.22 * interno + 0.12 * cierre);
  const satInterno = `saturate(${1 - 0.18 * interno})`;

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFEFE" }}>
      {/* ESCENAS 1–2 · la cama: duerme → despierta (siempre: cortina · entran: respiración, luz, ojos) */}
      <Plano desde={0} hasta={12.4}>
        <Camara
          claves={[
            { t: 0, x: 540, y: 1150, z: 1.0 },
            { t: 6.0, x: 580, y: 1120, z: 1.06 },
            { t: 6.6, x: 620, y: 1080, z: 1.1 },
            { t: 12.4, x: 743, y: 1029, z: 1.3 },
          ]}
        >
          <EscenaCama />
          <HazDeLuz puntos="1080,430 880,430 300,1500 760,1560" viaje={{ desde: 0, hasta: 6, dx: -260 }} intensidad={0.6} />
        </Camara>
      </Plano>

      {/* ESCENA 3 · borde de la cama, de lado: de general a las manos; exhala */}
      <Plano desde={12.4} hasta={18.8}>
        <Camara
          claves={[
            { t: 12.4, x: 560, y: 1180, z: 1.12 },
            { t: 15.4, x: 520, y: 1300, z: 1.2 },
            { t: 17.8, x: 500, y: 1420, z: 1.28 },
          ]}
        >
          <FondoDormitorio />
          <HazDeLuz puntos="1000,640 720,640 160,1700 720,1760" intensidad={0.5} />
          <Dani
            imagenes={["r2_borde-cama_hombros-arriba.png", "r2_borde-cama_hombros-abajo.png"]}
            cambios={[{ t: 15.8, a: 1, dur: 0.9 }]}
            k={0.92}
            y={280}
          />
        </Camara>
      </Plano>

      {/* ESCENA 4 · cocina: sirve café en automático; corte cuando la taza se llena */}
      <Plano desde={18.8} hasta={23.6}>
        <Camara
          claves={[
            { t: 18.8, x: 560, y: 1250, z: 1.04 },
            { t: 23.6, x: 760, y: 1380, z: 1.2 },
          ]}
        >
          <FondoCocina />
          <HazDeLuz puntos="1020,640 780,640 380,1500 760,1560" intensidad={0.45} />
          <Dani imagenes={["r2_cocina_jarra-arriba.png", "r2_cocina_jarra-inclinada.png"]} cambios={[{ t: 21.2, a: 1, dur: 0.6 }]} y={230} />
          {t > 21.8 && <Vapor x={826} y={1406} />}
        </Camara>
      </Plano>

      {/* ESCENA 5 · respiro: la taza; solo se mueve el vapor */}
      <Plano desde={23.6} hasta={26.0}>
        <Camara deriva={2} claves={[{ t: 23.6, x: 810, y: 1390, z: 1.3 }]}>
          <FondoCocina />
          <Dani imagenes={["r2_cocina_jarra-inclinada.png"]} respira={false} y={230} />
          <Vapor x={826} y={1406} />
        </Camara>
      </Plano>

      {/* ESCENA 6 · de pie en la cocina: la cámara se aleja, ella queda pequeña */}
      <Plano desde={26.0} hasta={31.0} fundidoSalida={0.4}>
        <Camara
          claves={[
            { t: 26.0, x: 360, y: 960, z: 1.28 },
            { t: 26.6, x: 360, y: 960, z: 1.28 },
            { t: 30.6, x: 540, y: 1150, z: 1.0 },
          ]}
        >
          <FondoCocinaAmplia />
          <Dani imagenes={["r2_de-pie-taza_ojos-abiertos.png"]} k={0.62} x={-212} y={-128} />
          <Vapor x={432} y={1062} escala={0.7} />
        </Camara>
      </Plano>

      {/* ESCENA 7 + CIERRE · junto a la ventana: sube al rostro; la luz baja (mundo interno) */}
      <Plano desde={31.0} hasta={44.4} fundidoEntrada={0.4}>
        <Camara
          filtro={satInterno}
          claves={[
            { t: 31.0, x: 540, y: 1200, z: 1.0 },
            { t: 32.0, x: 520, y: 1160, z: 1.04 },
            { t: 36.8, x: 440, y: 980, z: 1.26 },
            { t: 44.4, x: 440, y: 960, z: 1.3 },
          ]}
        >
          <FondoVentanaGrande />
          <HazDeLuz puntos="1000,620 640,620 80,1760 620,1760" intensidad={0.55} />
          <Dani imagenes={["r2_de-pie-taza_ojos-abiertos.png"]} k={0.72} x={-142} y={12} />
          <Vapor x={518} y={1090} escala={0.8} />
        </Camara>
      </Plano>

      {/* veladura cálida (apagón, mundo interno, cierre) */}
      <AbsoluteFill style={{ backgroundColor: "#EADCCB", mixBlendMode: "multiply", opacity: velo }} />

      {/* espacio en blanco superior: la ilustración se disuelve hacia el texto */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to bottom, #FFFEFE 0px, #FFFEFE 340px, rgba(255,254,254,0) 580px)",
          height: 600,
        }}
      />

      {FRASES.map((f) => (
        <Frase key={f.texto} texto={f.texto} desde={f.desde} hasta={f.hasta} />
      ))}
      <Frase texto="y todavía no tiene nombre." desde={38.4} cierre />
      <Intro />
    </AbsoluteFill>
  );
};
