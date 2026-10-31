export const CONTACT_SERVICES = [
  "Ascensores para Pasajeros",
  "Ascensores de Carga (Montacargas)",
  "Montacoches (Elevacoches)",
  "Ascensores para Movilidad Reducida",
  "Puertas Automáticas Vehiculares",
  "Escaleras Eléctricas",
  "Instalación",
  "Modernización",
  "Mantenimiento Preventivo y Correctivo",
  "Adecuación a la Norma NTC 5926",
  "Reparaciones Técnicas Especializadas",
  "Otro",
] as const;

const SERVICE_SELECTIONS: Record<string, (typeof CONTACT_SERVICES)[number]> = {
  "ascensores-pasajeros": CONTACT_SERVICES[0],
  "ascensores-carga": CONTACT_SERVICES[1],
  montacoches: CONTACT_SERVICES[2],
  "movilidad-reducida": CONTACT_SERVICES[3],
  "puertas-vehiculares": CONTACT_SERVICES[4],
  "escaleras-electricas": CONTACT_SERVICES[5],
  instalacion: CONTACT_SERVICES[6],
  modernizacion: CONTACT_SERVICES[7],
  mantenimiento: CONTACT_SERVICES[8],
  "adecuacion-normativa": CONTACT_SERVICES[9],
  reparaciones: CONTACT_SERVICES[10],
};

export function contactServiceSelection(slug: string): string {
  return SERVICE_SELECTIONS[slug] ?? "";
}

export function contactWhatsAppMessage(data: { nombre: string; telefono: string; correo?: string | undefined; empresa?: string | undefined; ciudad?: string | undefined; servicio: string; mensaje: string }) {
  return [
    `Nombre y Apellido: ${data.nombre}`,
    `Teléfono / WhatsApp: ${data.telefono}`,
    data.correo ? `Correo: ${data.correo}` : "",
    data.empresa ? `Nombre del Edificio o Empresa: ${data.empresa}` : "",
    data.ciudad ? `Ciudad: ${data.ciudad}` : "",
    `Servicio de interés: ${data.servicio}`,
    `¿En qué le podemos ayudar?: ${data.mensaje}`,
  ].filter(Boolean).join("\n\n");
}