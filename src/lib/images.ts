import lobby from "@/assets/lobby-pasillo.webp.asset.json";
import cabina from "@/assets/cabina-pasajeros.webp.asset.json";
import puerta from "@/assets/puerta-vehicular.webp.asset.json";
import escalera from "@/assets/escalera-electrica.webp.asset.json";
import pasillo from "@/assets/pasillo-ascensores.webp.asset.json";
import montacargas from "@/assets/montacargas.webp.asset.json";
import montacoches from "@/assets/montacoches.webp.asset.json";
import camillero from "@/assets/camillero.webp.asset.json";
import logo from "@/assets/logo.png.asset.json";

export const IMG = {
  lobby: lobby.url,
  cabina: cabina.url,
  puerta: puerta.url,
  escalera: escalera.url,
  pasillo: pasillo.url,
  montacargas: montacargas.url,
  montacoches: montacoches.url,
  camillero: camillero.url,
  logo: logo.url,
};

// Dimensiones reales de cada foto para adaptar contenedores sin recortes fuertes ni escalado.
export const IMG_META: Record<string, { w: number; h: number }> = {
  [IMG.lobby]: { w: 1600, h: 1067 },
  [IMG.cabina]: { w: 612, h: 428 },
  [IMG.puerta]: { w: 612, h: 408 },
  [IMG.escalera]: { w: 600, h: 800 },
  [IMG.pasillo]: { w: 1600, h: 896 },
  [IMG.montacargas]: { w: 960, h: 1280 },
  [IMG.montacoches]: { w: 739, h: 1195 },
  [IMG.camillero]: { w: 960, h: 1280 },
};

export const isVerticalImage = (src: string) => {
  const m = IMG_META[src];
  return !!m && m.h > m.w;
};

// Encuadre del elemento principal cuando la foto va en una tarjeta horizontal con object-cover.
export const IMG_POSITION: Record<string, string> = {
  [IMG.escalera]: "center 20%",
  [IMG.montacargas]: "center 30%",
  [IMG.montacoches]: "center 35%",
  [IMG.camillero]: "center 20%",
};

export type ProjectCategory =
  | "Pasajeros"
  | "Carga"
  | "Montacoches"
  | "Movilidad reducida"
  | "Puertas vehiculares"
  | "Escaleras eléctricas";

export const PROJECTS: { src: string; alt: string; category: ProjectCategory; title: string }[] = [
  { src: IMG.lobby, alt: "Lobby corporativo con varias puertas de ascensor en acero inoxidable", category: "Pasajeros", title: "Lobby con batería de ascensores" },
  { src: IMG.cabina, alt: "Cabina de ascensor de pasajeros con puertas de acero inoxidable abiertas", category: "Pasajeros", title: "Cabina de pasajeros" },
  { src: IMG.pasillo, alt: "Pasillo institucional con puertas de ascensor en ambos costados", category: "Pasajeros", title: "Pasillo con ascensores" },
  { src: IMG.montacargas, alt: "Montacargas con puertas naranjas cargado con bultos de mercancía", category: "Carga", title: "Montacargas para mercancía" },
  { src: IMG.montacoches, alt: "Montacoches en sótano de parqueadero con vehículo ingresando", category: "Montacoches", title: "Montacoches en sótano" },
  { src: IMG.camillero, alt: "Ascensor camillero con paciente en silla de ruedas y acompañante", category: "Movilidad reducida", title: "Ascensor camillero" },
  { src: IMG.puerta, alt: "Puerta corrediza vehicular automática junto a un vehículo", category: "Puertas vehiculares", title: "Puerta vehicular automática" },
  { src: IMG.escalera, alt: "Escaleras eléctricas en un edificio comercial moderno", category: "Escaleras eléctricas", title: "Escaleras eléctricas" },
];
