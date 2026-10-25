import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { getService, SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { CtaBand, WhatsAppButton } from "@/components/site/WhatsApp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/servicios/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Servicio no encontrado | Ascensores Páez" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: s.seoTitle },
        { name: "description", content: s.seoDescription },
        { property: "og:title", content: s.seoTitle },
        { property: "og:description", content: s.seoDescription },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `/servicios/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "Service", name: s.name, description: s.seoDescription, areaServed: "Bogotá, Colombia", provider: { "@type": "LocalBusiness", name: SITE.name, telephone: SITE.phoneE164 } },
              { "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
            ],
          }),
        },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const related = s.related.map(getService).filter(Boolean) as typeof SERVICES;
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div className="reveal">
            <nav aria-label="Ruta" className="text-xs text-ink-muted">
              <Link to="/" className="hover:text-ink-foreground">Inicio</Link> / <span>Soluciones</span> / <span className="text-ink-foreground">{s.name}</span>
            </nav>
            <p className="eyebrow mt-6">{s.name}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{s.heroTitle}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{s.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={s.whatsapp} label="Cotizar por WhatsApp" />
              <Link to="/contacto" className="inline-flex items-center justify-center rounded-md border border-ink-muted/40 px-6 py-3.5 text-sm font-bold hover:border-ink-foreground">Enviar formulario</Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img src={s.image} alt={s.imageAlt} className="h-[320px] w-full object-cover md:h-[460px]" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Aplicaciones recomendadas</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">¿Dónde se utiliza?</h2>
            <ul className="mt-8 space-y-4">
              {s.applications.map((a) => (
                <li key={a} className="flex items-start gap-3 border-b border-border pb-4"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Beneficios clave</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Lo que obtienes.</h2>
            <div className="mt-8 space-y-6">
              {s.benefits.map((b, i) => (
                <div key={b.title} className="flex gap-5">
                  <span className="text-2xl font-extrabold text-primary">0{i + 1}</span>
                  <div><h3 className="font-extrabold">{b.title}</h3><p className="mt-1 text-sm text-muted-foreground">{b.text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">Fotos reales</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Instalaciones de este tipo.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {s.gallery.map((g) => (
              <img key={g.src} src={g.src} alt={g.alt} loading="lazy" className="h-80 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Resolvemos tus dudas.</h2>
            <WhatsAppButton message={s.whatsapp} label="Preguntar por WhatsApp" className="mt-8" />
          </div>
          <Accordion type="single" collapsible className="lg:col-span-8">
            {s.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`}>
                <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-2xl font-extrabold">Soluciones relacionadas</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to="/servicios/$slug" params={{ slug: r.slug }} className="group flex items-center justify-between rounded-lg border border-border p-5 hover:border-primary">
                <span className="font-bold">{r.name}</span><ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand message={s.whatsapp} title={`¿Necesitas ${s.name.toLowerCase()}? Escríbenos.`} />
    </>
  );
}
