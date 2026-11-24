import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camara } from "../reel/Camara";
import { HazDeLuz, Vapor } from "../reel/Contexto";
import { Dani, Plano } from "../reel/Escena";
import { Frase } from "../reel/Frase";
import { Intro } from "../reel/Intro";
import {
  FondoCocinaAmplia,
  FondoDormitorioArriba,
  FondoDormitorioLado,
  FondoVentanaGrande,
  PrimerPlanoDormitorio,
} from "../reel/LineArt";
import { FPS } from "../reel/tokens";
import { FondoCocinaDetalle } from "../reel/FondoCocinaDetalle";

// Reel 2 · Burnout · "funcionar sin estar"
// Guion: guiones/REEL2_GUION_PRODUCCION_SIMPLE.md (texto validado por Teo).
//
// Sentido visual: todo avanza a su alrededor y ella no. Por eso la cámara es
// lenta y casi imperceptible (da vida, no distrae), los cambios son suaves y
// cada escena ENTRA y SALE junto con su texto.
//
// Reglas de composición:
// - el texto vive en la franja blanca superior (300-560 px);
// - ningún dibujo sube de 780 px y el zoom máximo con texto es 1,10, así que la
//   ilustración nunca toca el texto;
// - transición entre escenas: fundido de 0,8 s centrado en el límite; el texto
//   sale 0,2 s antes del límite y el siguiente entra 0,3 s después.
export const DURACION_R2 = 45.0;

const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const F = 0.8; // fundido entre escenas

// Límites de escena (s)
const B = { s3: 12.8, s4: 19.6, s5: 24.8, s6: 28.0, s7: 33.0, cierre: 39.4, fin: 45.0 };

const FRASES: { texto: string; desde: number; hasta: number }[] = [
  { texto: "Dormí todo el fin de semana.", desde: 0.9, hasta: 6.0 },
  { texto: "Llegó el lunes", desde: 6.8, hasta: 9.3 },
  { texto: "y amanecí igual de vacía.", desde: 9.6, hasta: B.s3 - 0.2 },
  { texto: "No es sueño atrasado.", desde: B.s3 + 0.3, hasta: 16.2 },
  { texto: "Dormir no lo repone.", desde: 16.5, hasta: B.s4 - 0.2 },
  { texto: "Estoy funcionando —", desde: B.s4 + 0.4, hasta: B.s5 - 0.2 }, // entra junto con la acción de servir
  // B.s5 → B.s6: respiro sin texto (la taza)
  { texto: "pero no estoy.", desde: B.s6 + 0.3, hasta: B.s7 - 0.2 },
  { texto: "Quizá no necesito descansar más.", desde: B.s7 + 0.3, hasta: 36.2 },
  { texto: "Quizá esto que cargo tiene otra forma,", desde: 36.5, hasta: B.cierre - 0.2 },
];

export const Reel2Burnout: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  // la luz baja un momento entre el fin de semana y el lunes
  const apagon = t < 6.4 ? interpolate(t, [5.9, 6.4], [0, 1], cl) : interpolate(t, [6.4, 7.0], [1, 0], cl);
  // mundo interno y cierre: veladura cálida suave, nunca gris
  const interno = interpolate(t, [33.4, 35.4], [0, 1], cl);
  const cierre = interpolate(t, [B.cierre, B.cierre + 1.4], [0, 1], cl);
  const velo = Math.max(0.3 * apagon, 0.2 * interno + 0.12 * cierre);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFEFE" }}>
      {/* ESCENAS 1-2 · la cama, vista desde arriba: duerme → despierta
          siempre: cortina · entran: respiración, luz que avanza, ojos */}
      <Plano desde={0} hasta={B.s3 + F / 2} fundidoSalida={F}>
        <Camara
          claves={[
            { t: 0, x: 540, y: 1500, z: 1.0 },
            { t: 6.4, x: 560, y: 1500, z: 1.04 },
            { t: B.s3, x: 640, y: 1460, z: 1.1 },
          ]}
          deriva={4}
        >
          <FondoDormitorioArriba />
          <HazDeLuz puntos="1000,840 760,840 260,1700 700,1780" viaje={{ desde: 0, hasta: 6.4, dx: -200 }} intensidad={0.5} />
          <Dani
            imagenes={["r2_cama-lado_ojos-cerrados.png", "r2_cama-lado_ojos-entreabiertos.png", "r2_cama-lado_ojos-abiertos.png"]}
            cambios={[
              { t: 7.6, a: 1, dur: 1.2 },
              { t: 9.3, a: 2, dur: 1.2 },
            ]}
            k={0.9}
            y={190}
          />
        </Camara>
      </Plano>

      {/* ESCENA 3 · borde de la cama: baja hacia sus manos; exhala con "Dormir no lo repone"
          siempre: cortina · entran: hombros que caen, planta */}
      <Plano desde={B.s3 - F / 2} hasta={B.s4 + F / 2} fundidoEntrada={F} fundidoSalida={F}>
        <Camara
          claves={[
            { t: B.s3 - F / 2, x: 520, y: 1600, z: 1.02 },
            { t: B.s4, x: 470, y: 1660, z: 1.09 },
          ]}
          deriva={4}
        >
          <FondoDormitorioLado />
          <HazDeLuz puntos="1000,830 700,830 160,1780 700,1820" intensidad={0.4} />
          <Dani
            imagenes={["r2_borde-cama_hombros-arriba.png", "r2_borde-cama_hombros-abajo.png"]}
            cambios={[{ t: 16.4, a: 1, dur: 1.4 }]}
            k={0.8}
            y={130}
          />
          <PrimerPlanoDormitorio />
        </Camara>
      </Plano>

      {/* ESCENA 4 · cocina: sirve café en automático
          siempre: cortina · entran: la jarra que se inclina, el vapor */}
      <Plano desde={B.s4 - F / 2} hasta={B.s5 + F / 2} fundidoEntrada={F} fundidoSalida={F}>
        <Camara
          claves={[
            { t: B.s4 - F / 2, x: 540, y: 1600, z: 1.0 },
            { t: B.s5, x: 700, y: 1600, z: 1.06 },
          ]}
          deriva={4}
        >
          <FondoCocinaDetalle pisoY={1736} />
          <HazDeLuz puntos="990,830 730,830 360,1600 760,1660" intensidad={0.4} />
          <Dani
            imagenes={["r2_cocina_jarra-arriba.png", "r2_cocina_jarra-inclinada.png"]}
            cambios={[
              { t: 20.2, a: 1, dur: 0.9 }, // "Estoy funcionando": inclina la jarra y sirve
              { t: 22.5, a: 0, dur: 0.9 }, // y la vuelve a levantar, en automático
            ]}
            k={0.85}
            y={100}
          />
          {t > 21.0 && <Vapor x={781} y={1388} />}
        </Camara>
      </Plano>

      {/* ESCENA 5 · respiro: la taza; solo se mueve el vapor */}
      <Plano desde={B.s5 - F / 2} hasta={B.s6 + F / 2} fundidoEntrada={F} fundidoSalida={F}>
        <Camara
          deriva={2}
          claves={[
            { t: B.s5 - F / 2, x: 781, y: 1600, z: 1.1 },
            { t: B.s6, x: 781, y: 1600, z: 1.13 },
          ]}
        >
          <FondoCocinaDetalle pisoY={1736} />
          <Dani imagenes={["r2_cocina_jarra-arriba.png"]} respira={false} k={0.85} y={100} />
          <Vapor x={781} y={1388} />
        </Camara>
      </Plano>

      {/* ESCENA 6 · de pie en la cocina: la cámara se aleja despacio, ella queda pequeña */}
      <Plano desde={B.s6 - F / 2} hasta={B.s7 + F / 2} fundidoEntrada={F} fundidoSalida={F}>
        <Camara
          claves={[
            { t: B.s6 - F / 2, x: 420, y: 1500, z: 1.1 },
            { t: B.s7, x: 540, y: 1500, z: 1.0 },
          ]}
          deriva={4}
        >
          <FondoCocinaAmplia />
          <Dani imagenes={["r2_de-pie-taza_ojos-abiertos.png"]} k={0.58} x={-182} y={60} />
          <Vapor x={455} y={1300} escala={0.65} />
        </Camara>
      </Plano>

      {/* ESCENA 7 + CIERRE · junto a la ventana: sube lento al rostro; la luz baja */}
      <Plano desde={B.s7 - F / 2} hasta={B.fin} fundidoEntrada={F}>
        <Camara
          filtro={`saturate(${1 - 0.18 * interno})`}
          claves={[
            { t: B.s7 - F / 2, x: 540, y: 1500, z: 1.0 },
            { t: B.cierre, x: 470, y: 1460, z: 1.08 },
            { t: B.fin, x: 460, y: 1450, z: 1.1 },
          ]}
          deriva={3}
        >
          <FondoVentanaGrande />
          <HazDeLuz puntos="1000,820 640,820 80,1780 620,1780" intensidad={0.45} />
          <Dani imagenes={["r2_de-pie-taza_ojos-abiertos.png"]} k={0.66} x={-142} y={200} />
          <Vapor x={508} y={1348} escala={0.75} />
        </Camara>
      </Plano>

      {/* veladura cálida (apagón, mundo interno, cierre) */}
      <AbsoluteFill style={{ backgroundColor: "#EADCCB", mixBlendMode: "multiply", opacity: velo }} />

      {/* franja del texto: blanco limpio arriba; la ilustración se disuelve debajo */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to bottom, #FFFEFE 0px, #FFFEFE 600px, rgba(255,254,254,0) 800px)",
          height: 820,
        }}
      />

      {FRASES.map((f) => (
        <Frase key={f.texto} texto={f.texto} desde={f.desde} hasta={f.hasta} />
      ))}
      <Frase texto="y todavía no tiene nombre." desde={B.cierre + 0.6} cierre />
      <Intro />
    </AbsoluteFill>
  );
};
