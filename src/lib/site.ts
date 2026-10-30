// Datos oficiales centralizados de Ascensores Páez S.A.S.
export const SITE = {
  name: "Ascensores Páez S.A.S.",
  shortName: "Ascensores Páez",
  founded: "Diciembre de 2018",
  phoneDisplay: "+57 321 900 5713",
  phoneLocal: "321 900 5713",
  phoneE164: "+573219005713",
  whatsappNumber: "573219005713",
  email: "ascensorespaezsas@gmail.com",
  address: "Ac. 153 #103b-76 Local 2-08, Bogotá D. C.",
  city: "Bogotá",
  norms: "NTC 5926-1 y NTC 5926-3",
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA_GENERAL =
  "Hola, Ascensores Páez. Me gustaría recibir asesoría sobre una solución de transporte vertical.";

// ── Cifras de conversión del home: edítalas aquí. `null` = no se muestra (nunca inventar cifras).
export const HOME_STATS = {
  equiposInstalados: null as number | null,
  edificiosMantenimiento: null as number | null,
  desde: 2018,
  googleRating: null as { rating: string; reviews: number } | null, // ej. { rating: "4,9", reviews: 32 }
  horasRespuesta: null as number | null, // "Respuesta en menos de X horas hábiles"
};

// Logos de clientes para la franja (deja `logo: null` para placeholder gris).
export const CLIENT_LOGOS: { name: string; logo: string | null }[] = [
  { name: "Cliente 1", logo: null },
  { name: "Cliente 2", logo: null },
  { name: "Cliente 3", logo: null },
  { name: "Cliente 4", logo: null },
  { name: "Cliente 5", logo: null },
  { name: "Cliente 6", logo: null },
];
