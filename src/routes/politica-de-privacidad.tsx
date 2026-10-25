import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de tratamiento de datos personales | Ascensores Páez" },
      { name: "description", content: "Política de tratamiento de datos personales de Ascensores Páez S.A.S. conforme a la Ley 1581 de 2012 (Habeas Data)." },
      { property: "og:title", content: "Política de privacidad | Ascensores Páez" },
      { property: "og:description", content: "Cómo tratamos tus datos personales conforme a la ley colombiana." },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidad" }],
  }),
  component: () => (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Política de tratamiento de datos personales</h1>
      <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-foreground">
        <p>En cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto 1074 de 2015, {SITE.name} informa la forma en que recolecta, almacena, usa y protege los datos personales de sus clientes y visitantes.</p>
        <h2>Responsable del tratamiento</h2>
        <p>{SITE.name}. Dirección: {SITE.address}. Correo: {SITE.email}. Teléfono: {SITE.phoneDisplay}.</p>
        <h2>Datos que recolectamos</h2>
        <p>Nombre, teléfono, correo electrónico, servicio de interés y el mensaje que nos envías a través del formulario de contacto o WhatsApp.</p>
        <h2>Finalidad</h2>
        <p>Atender tus solicitudes de información y cotización, contactarte sobre el servicio solicitado y gestionar la relación comercial.</p>
        <h2>Derechos del titular</h2>
        <p>Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, así como revocar la autorización otorgada, en los términos de la ley.</p>
        <h2>Cómo ejercer tus derechos</h2>
        <p>Envía tu solicitud al correo {SITE.email} indicando tu nombre, tus datos de contacto y la petición concreta.</p>
        <h2>Seguridad</h2>
        <p>Adoptamos medidas razonables para proteger tus datos contra acceso no autorizado, pérdida o uso indebido.</p>
      </div>
    </article>
  ),
});
