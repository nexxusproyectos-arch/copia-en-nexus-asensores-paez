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
  "Adecuación a la Norma NTC 5926-1",
  "Otro",
] as const;

export function contactWhatsAppMessage(data: { nombre: string; telefono: string; correo?: string; empresa?: string; ciudad?: string; servicio: string; mensaje: string }) {
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