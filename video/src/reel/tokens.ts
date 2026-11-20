// Constantes del sistema audiovisual de los reels (Documento maestro de Reels).
export const FPS = 30;
export const W = 1080;
export const H = 1920;

export const COLOR = {
  fondo: "#FFFEFE", // fondo de escena: predomina el blanco
  crema: "#F5ECE3", // fondo del cierre
  tinta: "#2D2825", // line art (negro cálido)
  texto: "#1A1A1A",
  borgona: "#7D4F6A", // solo la frase de cierre
  beige: "#EED3BB", // espiral, punto, detalles mínimos
  luz: "#FFF4E2", // haz de luz cálido
  persianaLamina: "#FCFBF9",
};

export const TEXTO = {
  fuente: "Fraunces",
  peso: 600,
  tamano: 76,
  margenIzq: 92,
  top: 150,
  topCierre: 330,
  anchoMax: 800,
  interlineado: 1.4,
  retrasoPalabra: 0.12, // s
  entradaPalabra: 0.65, // s
  subida: 18, // px
  salida: 0.5, // s
};

export const s = (segundos: number) => Math.round(segundos * FPS);
