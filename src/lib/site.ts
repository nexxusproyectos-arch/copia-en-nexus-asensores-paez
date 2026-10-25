// Datos oficiales centralizados de Ascensores Páez S.A.S.
export const SITE = {
  name: "Ascensores Páez S.A.S.",
  shortName: "Ascensores Páez",
  founded: "Diciembre de 2018",
  phoneDisplay: "+57 321 900 5713",
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
