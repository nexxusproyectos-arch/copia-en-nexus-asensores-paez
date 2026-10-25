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
