import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/politica-de-privacidad")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Política de tratamiento de datos personales | Ascensores Páez" },
      { name: "description", content: "Política de tratamiento de datos personales de Ascensores Páez S.A.S. conforme a la Ley 1581 de 2012 (Habeas Data)." },
      { property: "og:title", content: "Política de privacidad | Ascensores Páez" },
      { property: "og:description", content: "Cómo tratamos sus datos personales conforme a la ley colombiana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <p>{SITE.name}. Dirección: {SITE.address}. Correo: {SITE.email}. Teléfonos: {SITE.phoneDisplay} y {SITE.secondaryPhoneDisplay}.</p>
        <h2>Datos que recolectamos</h2>
        <p>Nombre, teléfono, correo electrónico, servicio de interés y el mensaje que nos envía a través del formulario de contacto o WhatsApp.</p>
        <h2>Finalidad</h2>
        <p>Atender sus solicitudes de información y cotización, contactarlo sobre el servicio solicitado y gestionar la relación comercial.</p>
        <h2>Derechos del titular</h2>
        <p>Puede conocer, actualizar, rectificar y solicitar la supresión de sus datos, así como revocar la autorización otorgada, en los términos de la ley.</p>
        <h2>Cómo ejercer sus derechos</h2>
        <p>Envíe su solicitud al correo {SITE.email} indicando su nombre, sus datos de contacto y la petición concreta.</p>
        <h2>Seguridad</h2>
        <p>Adoptamos medidas razonables para proteger sus datos contra acceso no autorizado, pérdida o uso indebido.</p>
      </div>
    </article>
  ),
});
