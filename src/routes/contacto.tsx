import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactServiceSelection } from "@/lib/contact-details";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/site/ContactForm";
import { WhatsAppButton } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/contacto")({
  staticData: { sitemap: true },
  validateSearch: zodValidator(z.object({ servicio: fallback(z.string(), "").default("") })),
  search: { middlewares: [({ search, next }) => {
    const result = next(search);
    if (result["servicio"] === "") delete result["servicio"];
    return result;
  }] },
  head: () => ({
    meta: [
      { title: "Contacto | Ascensores Páez S.A.S. Colombia" },
      { name: "description", content: "Contacte a Ascensores Páez S.A.S. por WhatsApp, correo o formulario. Atención de transporte vertical y accesos automáticos a nivel nacional en Colombia." },
      { property: "og:title", content: "Contacto | Ascensores Páez" },
      { property: "og:description", content: "Escríbenos por WhatsApp o déjanos tus datos y te contactamos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contact,
});

function Contact() {
  const { servicio } = Route.useSearch();
  return <>
    <section className="bg-ink py-16 text-ink-foreground lg:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Contacto</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold md:text-6xl">Hablemos de su requerimiento</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">La forma más rápida de comunicarse con nuestro equipo técnico es vía WhatsApp. También puede registrar sus datos en el formulario y lo contactaremos en el menor tiempo posible.</p>
      </div>
    </section>
    <section className="py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12">
        <aside className="space-y-8 lg:col-span-4">
          <WhatsAppButton message="Hola, Ascensores Páez. Quiero hablar con un asesor." label="Chatear por WhatsApp" className="w-full" />
            <ul className="space-y-5 text-sm">
              <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><div><span className="block font-bold">Teléfono / WhatsApp</span><a href={`tel:${SITE.phoneE164}`} className="text-muted-foreground hover:text-foreground">{SITE.phoneDisplay}</a></div></li>
              <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /><div><span className="block font-bold">Correo</span><a href={`mailto:${SITE.email}`} className="break-all text-muted-foreground hover:text-foreground">{SITE.email}</a></div></li>
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /><div><span className="block font-bold">Dirección</span><span className="text-muted-foreground">{SITE.address}</span></div></li>
            </ul>
        </aside>
        <div className="min-w-0 lg:col-span-8"><ContactForm key={servicio} contactPage initialService={contactServiceSelection(servicio)} /></div>
      </div>
    </section>
  </>;
}
