import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camara } from "../reel/Camara";
import { Cierre } from "../reel/Cierre";
import { HazDeLuz, Polvo, Vapor } from "../reel/Contexto";
import {
  Dani,
  FondoCocina,
  FondoCocinaAmplia,
  FondoDormitorioArriba,
  FondoDormitorioLado,
  FondoVentana,
  Plano,
} from "../reel/Escena";
import { Frase } from "../reel/Frase";
import { Intro } from "../reel/Intro";
import { COLOR, FPS } from "../reel/tokens";

// Reel 2 · Burnout · "funcionar sin estar"
// Guion: guiones/reels-2-3-4-validados.md · Planos: reels/r2-burnout/
// Todos los tiempos en segundos absolutos del reel.
export const DURACION_R2 = 44.4;

const T = {
  cama: [0, 12.4], // planos 1 y 2 (misma cama: duerme → despierta)
  borde: [12.4, 18.8], // plano 3
  cocina: [18.8, 23.6], // plano 4
  inserto: [23.6, 26.0], // plano 5 · respiro
  amplia: [26.0, 31.0], // plano 6 · la cámara se aleja
  ventana: [31.0, 37.6], // plano 7 · mundo interno
  cierre: 37.4,
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
const FRASE_CIERRE = "y todavía no tiene nombre.";

export const Reel2Burnout: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  // "la luz se apaga y vuelve" entre el fin de semana y el lunes
  const apagon = interpolate(t, [5.8, 6.2, 6.7], [1, 0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // mundo interno: la luz baja ≈10 % y el color se apaga ≈18 %, nunca gris:
  // sobre fondo blanco se logra con una veladura cálida (multiply) + saturación
  const interno = interpolate(t, [31.4, 33.0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const filtroInterno = `saturate(${1 - 0.18 * interno})`;

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR.fondo }}>
      {/* PLANOS 1–2 · cama: duerme (la luz recorre la cama) → abre los ojos */}
      <Plano desde={T.cama[0]} hasta={T.cama[1]}>
        <Camara
          filtro={`brightness(${apagon})`}
          claves={[
            { t: 0, x: 560, y: 980, z: 1.0 },
            { t: 6.0, x: 600, y: 940, z: 1.06 },
            { t: 6.6, x: 640, y: 820, z: 1.1 },
            { t: 12.4, x: 686, y: 700, z: 1.3 },
          ]}
        >
          <FondoDormitorioArriba />
          <Dani
            imagenes={["r2_cama-lado_ojos-cerrados.png", "r2_cama-lado_ojos-entreabiertos.png", "r2_cama-lado_ojos-abiertos.png"]}
            cambios={[
              { t: 7.7, a: 1, dur: 0.5 },
              { t: 9.0, a: 2, dur: 0.4 },
            ]}
          />
          <HazDeLuz puntos="1180,260 880,260 260,1560 620,1560" viaje={{ desde: 0, hasta: 6, dx: -260 }} intensidad={0.7} />
          <Polvo zona={{ x: 420, y: 420, w: 640, h: 1100 }} semilla="cama" />
        </Camara>
      </Plano>

      {/* PLANO 3 · borde de la cama: de general a las manos; exhala en "Dormir no lo repone" */}
      <Plano desde={T.borde[0]} hasta={T.borde[1]}>
        <Camara
          claves={[
            { t: 12.4, x: 540, y: 1000, z: 1.0 },
            { t: 15.4, x: 520, y: 1150, z: 1.12 },
            { t: 17.6, x: 490, y: 1250, z: 1.25 },
          ]}
        >
          <FondoDormitorioLado />
          <HazDeLuz puntos="1030,560 760,560 160,1600 720,1700" intensidad={0.6} />
          <Dani
            imagenes={["r2_borde-cama_hombros-arriba.png", "r2_borde-cama_hombros-abajo.png"]}
            cambios={[{ t: 15.8, a: 1, dur: 0.9 }]}
          />
          <Polvo zona={{ x: 420, y: 560, w: 640, h: 900 }} semilla="borde" />
        </Camara>
      </Plano>

      {/* PLANO 4 · cocina en automático: sigue manos y taza; corte en la acción (la taza llena) */}
      <Plano desde={T.cocina[0]} hasta={T.cocina[1]}>
        <Camara
          claves={[
            { t: 18.8, x: 560, y: 1000, z: 1.05 },
            { t: 23.6, x: 740, y: 1110, z: 1.22 },
          ]}
        >
          <FondoCocina />
          <HazDeLuz puntos="1030,560 800,560 380,1400 760,1500" intensidad={0.55} />
          <Dani
            imagenes={["r2_cocina_jarra-arriba.png", "r2_cocina_jarra-inclinada.png"]}
            cambios={[{ t: 21.2, a: 1, dur: 0.6 }]}
          />
          {t > 21.8 && <Vapor x={826} y={1176} />}
          <Polvo zona={{ x: 560, y: 600, w: 500, h: 800 }} semilla="cocina" />
        </Camara>
      </Plano>

      {/* PLANO 5 · respiro: la taza, solo el vapor se mueve */}
      <Plano desde={T.inserto[0]} hasta={T.inserto[1]}>
        <Camara deriva={2} claves={[{ t: 23.6, x: 800, y: 1150, z: 1.3 }]}>
          <FondoCocina />
          <Dani imagenes={["r2_cocina_jarra-inclinada.png"]} respira={false} />
          <Vapor x={826} y={1176} />
        </Camara>
      </Plano>

      {/* PLANO 6 · de pie con la taza: la cámara se aleja, ella queda pequeña */}
      <Plano desde={T.amplia[0]} hasta={T.amplia[1]} fundidoSalida={0.4}>
        <Camara
          claves={[
            { t: 26.0, x: 360, y: 840, z: 1.28 },
            { t: 26.6, x: 360, y: 840, z: 1.28 },
            { t: 30.6, x: 540, y: 960, z: 1.0 },
          ]}
        >
          <FondoCocinaAmplia />
          <HazDeLuz puntos="940,720 640,720 120,1700 560,1700" intensidad={0.5} />
          <Dani imagenes={["r2_de-pie-taza_ojos-abiertos.png"]} k={0.62} x={-212} y={-128} />
          <Vapor x={432} y={1062} escala={0.7} />
          <Polvo zona={{ x: 300, y: 700, w: 700, h: 900 }} semilla="amplia" />
        </Camara>
      </Plano>

      {/* PLANO 7 · junto a la ventana: sube al rostro y baja la luz (mundo interno) */}
      <Plano desde={T.ventana[0]} hasta={T.ventana[1]} fundidoEntrada={0.4}>
        <Camara
          filtro={filtroInterno}
          claves={[
            { t: 31.0, x: 540, y: 1000, z: 1.0 },
            { t: 32.0, x: 520, y: 960, z: 1.04 },
            { t: 36.5, x: 440, y: 720, z: 1.25 },
          ]}
        >
          <FondoVentana />
          <HazDeLuz puntos="1000,520 660,520 80,1720 620,1720" intensidad={0.65} />
          <Dani imagenes={["r2_de-pie-taza_ojos-abiertos.png"]} k={0.82} x={-142} y={20} />
          <Vapor x={536} y={978} escala={0.85} />
          <Polvo zona={{ x: 300, y: 520, w: 720, h: 1100 }} semilla="ventana" />
        </Camara>
        <AbsoluteFill style={{ backgroundColor: "#EBDDCB", mixBlendMode: "multiply", opacity: 0.55 * interno }} />
      </Plano>

      {/* Texto (fuera de la cámara: no se mueve con el zoom) */}
      {FRASES.map((f) => (
        <Frase key={f.texto} texto={f.texto} desde={f.desde} hasta={f.hasta} />
      ))}

      <Cierre desde={T.cierre} frase={FRASE_CIERRE} />
      <Intro />
    </AbsoluteFill>
  );
};
