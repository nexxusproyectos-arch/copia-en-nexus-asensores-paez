import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, HardHat, ShieldCheck, UserRound } from "lucide-react";
import { IMG } from "@/lib/images";
import { SERVICES } from "@/lib/services";
import { SITE, waLink } from "@/lib/site";
import { CtaBand, WhatsAppButton } from "@/components/site/WhatsApp";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ascensores Páez S.A.S. | Ascensores y transporte vertical en Bogotá" },
      { name: "description", content: "Ascensores para pasajeros, montacargas, montacoches, escaleras eléctricas y puertas vehiculares. Instalación, modernización y mantenimiento en Bogotá." },
      { property: "og:title", content: "Ascensores Páez S.A.S. | Movilidad vertical con respaldo técnico" },
      { property: "og:description", content: "Soluciones de transporte vertical y automatización de accesos en Bogotá. Escríbenos por WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const HERO_MSG = "Hola, Ascensores Páez. Vi su página web y quiero asesoría para mi proyecto.";

function Home() {
  const servicios = SERVICES.filter((s) => s.group === "servicio");
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 lg:grid-cols-12 lg:gap-0 lg:pb-0 lg:pt-0">
          <div className="reveal relative z-10 flex flex-col justify-center lg:col-span-6 lg:py-28 lg:pr-12">
            <p className="eyebrow">{SITE.name}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Movilidad vertical con respaldo técnico <span className="text-primary">a cada paso.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              Ascensores, montacargas, montacoches, escaleras eléctricas y puertas automáticas vehiculares. Te acompañamos desde la asesoría hasta la instalación y el mantenimiento.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={HERO_MSG} label="Solicitar asesoría por WhatsApp" />
              <a href="#soluciones" className="inline-flex items-center justify-center gap-2 rounded-md border border-ink-muted/40 px-6 py-3.5 text-sm font-bold hover:border-ink-foreground">
                Ver soluciones <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ul className="mt-12 grid gap-4 border-t border-ink-muted/20 pt-8 text-sm sm:grid-cols-3">
              {["Acompañamiento técnico", "Soluciones según cada proyecto", "Instalación y mantenimiento"].map((t) => (
                <li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative h-[340px] overflow-hidden rounded-lg sm:h-[440px] lg:absolute lg:inset-y-0 lg:-right-[max(0px,calc((100vw-80rem)/2))] lg:left-0 lg:h-auto lg:rounded-none">
              <img src={IMG.lobby} alt="Lobby arquitectónico con ascensores en acero inoxidable" className="h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-6 hidden w-56 overflow-hidden rounded-lg border-4 border-ink shadow-2xl sm:block lg:bottom-12 lg:-left-16">
              <img src={IMG.cabina} alt="Cabina de pasajeros" className="h-40 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones */}
      <section id="soluciones" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Catálogo de soluciones</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Encuentra la solución que necesita tu proyecto.</h2>
            </div>
            <p className="text-muted-foreground lg:col-span-5">Selecciona una categoría para conocer sus aplicaciones, beneficios y preguntas frecuentes, o escríbenos directamente.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} className="group flex flex-col bg-background">
                <div className="relative h-52 overflow-hidden bg-muted">
                  <img src={s.image} alt={s.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded bg-ink px-2 py-1 text-xs font-extrabold text-ink-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-extrabold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">Ver solución <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="bg-ink py-20 text-ink-foreground lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Por qué Ascensores Páez</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Ingeniería cercana, con la seguridad primero.</h2>
            <p className="mt-6 text-ink-muted">Desde 2018 acompañamos a administraciones, constructoras, empresas y familias en Bogotá con soluciones de transporte vertical.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-ink-muted/20 sm:grid-cols-2 lg:col-span-7">
            {[
              { icon: HardHat, t: "Acompañamiento técnico", d: "Te orientamos en cada etapa: diagnóstico, instalación y mantenimiento." },
              { icon: UserRound, t: "Atención personalizada", d: "Un contacto directo con nuestro equipo, sin intermediarios." },
              { icon: ShieldCheck, t: "Seguridad como prioridad", d: "La seguridad de los usuarios guía cada decisión técnica." },
              { icon: Compass, t: "Orientación sobre normativa", d: `Te guiamos sobre la ${SITE.norms} aplicable a tu equipo.` },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-ink p-8">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-5 text-lg font-extrabold">{t}</h3>
                <p className="mt-2 text-sm text-ink-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Proyectos</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Instalaciones reales.</h2>
            </div>
            <Link to="/proyectos" className="inline-flex items-center gap-1 text-sm font-bold text-primary">Ver todos los proyectos <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10"><Gallery /></div>
        </div>
      </section>

      {/* Servicios técnicos */}
      <section className="border-y border-border py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">Servicios técnicos</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">Del montaje al mantenimiento, un solo equipo.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {servicios.map((s, i) => (
              <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} className="group border-t-2 border-foreground pt-6 transition hover:border-primary">
                <span className="text-sm font-extrabold text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-extrabold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:text-primary">Conocer más <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Nosotros */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={IMG.pasillo} alt="Pasillo con ascensores" loading="lazy" className="h-72 w-full rounded-lg object-cover" />
            <img src={IMG.camillero} alt="Ascensor camillero" loading="lazy" className="mt-10 h-72 w-full rounded-lg object-cover" />
          </div>
          <div>
            <p className="eyebrow">Nosotros</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Una empresa bogotana en ascenso.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Ascensores Páez S.A.S. nació en diciembre de 2018 en Bogotá con el propósito de ofrecer soluciones de transporte vertical y automatización de accesos con un trato cercano, serio y comprometido con la seguridad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/nosotros" className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-sm font-bold text-background">Conocer la empresa <ArrowRight className="h-4 w-4" /></Link>
              <a href={waLink("Hola, Ascensores Páez. Quiero conocer más sobre la empresa y sus servicios.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md border border-border px-6 py-3.5 text-sm font-bold hover:border-foreground">Hablar con nosotros</a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Cuéntanos tu proyecto y te asesoramos por WhatsApp." message={HERO_MSG} />
    </>
  );
}
