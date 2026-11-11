import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { elevatorAnchor, getService } from "@/lib/services";
import { IMG_META } from "@/lib/images";
import { SITE } from "@/lib/site";
import { WhatsAppButton } from "@/components/site/WhatsApp";
import { ElevatorServices } from "@/components/site/ElevatorServices";
import { ServiceGallery } from "@/components/site/ServiceGallery";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/servicios/$slug")({
  staticData: { sitemap: true },
  beforeLoad: ({ params }) => {
    const hash = elevatorAnchor(params.slug);
    if (hash) throw redirect({ to: "/servicios/$slug", params: { slug: "ascensores" }, hash, statusCode: 301 });
  },
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
        { name: "twitter:card", content: "summary_large_image" },
        ...(s.image.startsWith("https://") ? [
          { property: "og:image", content: s.image },
          { name: "twitter:image", content: s.image },
        ] : []),
      ],
      links: [{ rel: "canonical", href: `/servicios/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.seoDescription,
            areaServed: "Colombia",
            provider: { "@type": "LocalBusiness", name: SITE.name, telephone: [SITE.phoneE164, SITE.secondaryPhoneE164] },
          }),
        },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const reduce = useReducedMotion();
  if (s.slug === "ascensores") return <ElevatorServices />;
  const meta = IMG_META[s.image];
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:py-16">
          <nav aria-label="Ruta" className="text-xs text-ink-muted">
            <Link to="/" className="hover:text-ink-foreground">Inicio</Link> / <span>Servicios</span> / <span className="text-ink-foreground">{s.name}</span>
          </nav>
          <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">{s.heroTitle}</h1>
        </div>
      </section>
      <section className="overflow-hidden py-14 lg:py-20">
        <motion.div initial={false} whileInView={{ opacity: [0.6, 1], x: reduce ? 0 : [-24, 0] }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: reduce ? 0.2 : 0.6 }} className="mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-lg">
            <img
              src={s.image}
              alt={s.imageAlt}
              loading="lazy"
              width={meta?.w ?? 720}
              height={meta?.h ?? 540}
               className="mx-auto h-auto max-h-[560px] w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="leading-relaxed text-muted-foreground">{s.intro}</p>
            {s.intro2 && <p className="mt-4 leading-relaxed text-muted-foreground">{s.intro2}</p>}
            {s.disclaimer && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{s.disclaimer}</p>}
            <div className="mt-8 flex flex-col items-start gap-3 xl:flex-row xl:flex-wrap">
              <WhatsAppButton message={s.whatsapp} label={s.whatsappLabel ?? "Cotizar por WhatsApp"} />
              <Button asChild className="h-auto min-h-12 whitespace-normal px-6 py-3.5 font-bold"><Link to="/" search={{ servicio: s.slug }} hash="formulario"><ClipboardList />Prefiero Dejar Datos</Link></Button>
            </div>
          </div>
        </motion.div>
      </section>
      {s.galleryTitle && <ServiceGallery title={s.galleryTitle} photos={s.gallery} />}
    </>
  );
}
