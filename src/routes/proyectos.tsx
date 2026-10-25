import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/Gallery";
import { CtaBand } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos e instalaciones | Ascensores Páez S.A.S." },
      { name: "description", content: "Galería de instalaciones reales: ascensores de pasajeros, montacargas, montacoches, camilleros, escaleras eléctricas y puertas vehiculares." },
      { property: "og:title", content: "Proyectos e instalaciones | Ascensores Páez" },
      { property: "og:description", content: "Conoce instalaciones reales de transporte vertical y accesos automáticos." },
    ],
    links: [{ rel: "canonical", href: "/proyectos" }],
  }),
  component: () => (
    <>
      <section className="bg-ink py-16 text-ink-foreground lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">Proyectos</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">Instalaciones y tipos de solución.</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">Filtra por tipo de solución y abre cada foto para verla en detalle.</p>
        </div>
      </section>
      <section className="py-16"><div className="mx-auto max-w-7xl px-5"><Gallery /></div></section>
      <CtaBand message="Hola, Ascensores Páez. Vi sus proyectos y quiero asesoría para el mío." />
    </>
  ),
});
