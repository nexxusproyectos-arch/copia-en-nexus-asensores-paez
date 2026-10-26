import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, FileCheck2, HardHat, MessageCircle, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ElevatorIntro } from "@/components/site/ElevatorIntro";
import { CountUp, Reveal, Stagger, staggerItem } from "@/components/site/motion";
import { Cotizador } from "@/components/site/Cotizador";
import { IMG } from "@/lib/images";
import { SERVICES } from "@/lib/services";
import { HOME_STATS, SITE, waLink } from "@/lib/site";
import { WhatsAppButton } from "@/components/site/WhatsApp";
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

const PROFILES = [
  {
    id: "admin",
    label: "Soy administrador de propiedad horizontal",
    sub: "Mantenimiento, certificación NTC 5926 y atención de emergencias para el ascensor de tu conjunto o edificio, con un equipo que responde.",
    msg: "Hola, administro un conjunto y necesito mantenimiento/certificación del ascensor.",
  },
  {
    id: "constructora",
    label: "Soy constructora",
    sub: "Suministro e instalación de ascensores, montacargas y montacoches para tu obra, con acompañamiento técnico desde el diseño hasta la entrega.",
    msg: "Hola, soy de una constructora y necesito cotizar equipos de transporte vertical para un proyecto.",
  },
  {
    id: "empresa",
    label: "Empresa / comercio",
    sub: "Montacargas, escaleras eléctricas y puertas vehiculares automáticas para que tu operación no se detenga.",
    msg: "Hola, tengo una empresa/comercio y necesito asesoría sobre equipos de transporte vertical o puertas automáticas.",
  },
] as const;

const DEFAULT_SUB = "Ascensores, montacargas, montacoches, escaleras eléctricas y puertas automáticas vehiculares. Te acompañamos desde la asesoría hasta la instalación y el mantenimiento.";
const HERO_MSG = "Hola, Ascensores Páez. Vi su página web y quiero asesoría para mi proyecto.";

function scrollToQuote() {
  document.getElementById("cotizador")?.scrollIntoView({ behavior: "smooth" });
}

function Home() {
  const [profile, setProfile] = useState<(typeof PROFILES)[number] | null>(null);
  const [preset, setPreset] = useState<{ need: string; n: number } | undefined>();
  const [tab, setTab] = useState<"producto" | "servicio">("producto");
  const catalog = SERVICES.filter((s) => s.group === tab);
  const stats = ([
    HOME_STATS.equiposInstalados != null ? { key: "eq", node: <><CountUp to={HOME_STATS.equiposInstalados} prefix="+" /> equipos instalados</> } : null,
    HOME_STATS.edificiosMantenimiento != null ? { key: "ed", node: <><CountUp to={HOME_STATS.edificiosMantenimiento} prefix="+" /> edificios en mantenimiento</> } : null,
    { key: "desde", node: <>Desde {HOME_STATS.desde}</> },
  ] as ({ key: string; node: ReactNode } | null)[]).filter((x): x is { key: string; node: ReactNode } => x !== null);

  return (
    <>
      <ElevatorIntro />
      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 lg:grid-cols-12 lg:gap-0 lg:pb-0 lg:pt-0">
          <div className="relative z-10 flex flex-col justify-center lg:col-span-6 lg:py-24 lg:pr-12">
            <p className="eyebrow">{SITE.name}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="line-mask"><span style={{ animationDelay: "0.9s" }}>Movilidad vertical</span></span>
              <span className="line-mask"><span style={{ animationDelay: "0.98s" }}>con respaldo técnico</span></span>
              <span className="line-mask"><span className="text-primary" style={{ animationDelay: "1.06s" }}>a cada paso.</span></span>
            </h1>
            <div className="mt-7 flex flex-wrap gap-2" role="radiogroup" aria-label="Tu perfil">
              {PROFILES.map((p) => (
                <button key={p.id} role="radio" aria-checked={profile?.id === p.id} onClick={() => setProfile(profile?.id === p.id ? null : p)} className={`rounded-full border px-4 py-2 text-xs font-bold transition sm:text-sm ${profile?.id === p.id ? "border-primary bg-primary text-primary-foreground" : "border-ink-muted/40 hover:border-ink-foreground"}`}>
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted" aria-live="polite">{profile?.sub ?? DEFAULT_SUB}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={profile?.msg ?? HERO_MSG} label="Solicitar asesoría por WhatsApp" />
              <button onClick={scrollToQuote} className="inline-flex items-center justify-center gap-2 rounded-md border border-ink-muted/40 px-6 py-3.5 text-sm font-bold hover:border-ink-foreground">
                Cotizar en 60 segundos <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink-muted/20 pt-6 text-sm font-bold">
              {stats.map((t) => (
                <li key={t.key} className="flex items-center gap-2"><span className="h-2 w-2 shrink-0 bg-primary" />{t.node}</li>
              ))}
            </ul>
          </div>
          <HeroMedia />
        </div>
      </section>

      <Cotizador preset={preset} />

      {/* Soluciones */}
      <section id="soluciones" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">Catálogo de soluciones</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Encuentra la solución que necesita tu proyecto.</h2>
            </Reveal>
            <div className="flex gap-2 lg:col-span-5 lg:justify-end" role="tablist" aria-label="Tipo de solución">
              {([["producto", "Equipos"], ["servicio", "Servicios"]] as const).map(([k, l]) => (
                <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${tab === k ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
                  {l} ({SERVICES.filter((s) => s.group === k).length})
                </button>
              ))}
            </div>
          </div>
          <div className={`no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:overflow-visible md:px-0 md:grid-cols-3 ${tab === "producto" ? "md:grid-rows-[repeat(3,13rem)]" : "md:grid-rows-[repeat(2,15rem)]"}`}>
            {catalog.map((s, i) => (
              <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} className={`group relative block w-[82%] shrink-0 snap-start overflow-hidden rounded-lg bg-ink text-ink-foreground md:w-auto ${i === 0 ? "h-80 md:col-span-2 md:row-span-2 md:h-auto" : "h-80 md:h-auto"} ${tab === "servicio" && i === 0 ? "md:col-span-1" : ""} ${tab === "servicio" && i === 3 ? "md:col-span-2" : ""}`}>
                <img src={s.image} alt={s.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className={`font-extrabold ${i === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}>{s.name}</h3>
                  <p className={`mt-1 text-sm text-ink-muted ${i === 0 ? "" : "line-clamp-2"}`}>{s.short}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">Ver solución <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="bg-ink py-20 text-ink-foreground lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Por qué Ascensores Páez</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Ingeniería cercana, con la seguridad primero.</h2>
            <p className="mt-6 text-ink-muted">Desde 2018 acompañamos a administraciones, constructoras, empresas y familias en Bogotá con soluciones de transporte vertical.</p>
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden rounded-lg bg-ink-muted/20 sm:grid-cols-2 lg:col-span-7">
            {[
              { icon: HardHat, t: "Acompañamiento técnico", d: "Te orientamos en cada etapa: diagnóstico, instalación y mantenimiento." },
              { icon: UserRound, t: "Atención personalizada", d: "Un contacto directo con nuestro equipo, sin intermediarios." },
              { icon: ShieldCheck, t: "Seguridad como prioridad", d: "La seguridad de los usuarios guía cada decisión técnica." },
              { icon: Compass, t: "Orientación sobre normativa", d: `Te guiamos sobre la ${SITE.norms} aplicable a tu equipo.` },
            ].map(({ icon: Icon, t, d }) => (
              <motion.div variants={staggerItem} key={t} className="bg-ink p-8">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-5 text-lg font-extrabold">{t}</h3>
                <p className="mt-2 text-sm text-ink-muted">{d}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Normativa */}
      <section id="normativa" className="scroll-mt-20 border-b border-border py-16">
        <Reveal className="mx-auto flex max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-5">
            <FileCheck2 className="h-12 w-12 shrink-0 text-primary" />
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">¿Tu ascensor está al día con la NTC 5926?</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">La revisión periódica es obligatoria y un equipo no certificado puede generar sanciones y riesgos para los residentes. Te ayudamos a prepararlo para la inspección.</p>
            </div>
          </div>
          <button onClick={() => { setPreset({ need: "Certificación NTC 5926", n: Date.now() }); scrollToQuote(); }} className="btn-shine inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground hover:brightness-110">
            Solicitar diagnóstico <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="eyebrow">Proyectos</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Instalaciones reales.</h2>
            </Reveal>
            <Link to="/proyectos" className="inline-flex items-center gap-1 text-sm font-bold text-primary">Ver todos los proyectos <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10"><Gallery /></div>
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
          <Reveal>
            <p className="eyebrow">Nosotros</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Una empresa bogotana en ascenso.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Ascensores Páez S.A.S. nació en diciembre de 2018 en Bogotá con el propósito de ofrecer soluciones de transporte vertical y automatización de accesos con un trato cercano, serio y comprometido con la seguridad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/nosotros" className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-sm font-bold text-background">Conocer la empresa <ArrowRight className="h-4 w-4" /></Link>
              <a href={waLink("Hola, Ascensores Páez. Quiero conocer más sobre la empresa y sus servicios.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md border border-border px-6 py-3.5 text-sm font-bold hover:border-foreground">Hablar con nosotros</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section id="contacto-final" className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="absolute inset-y-0 left-0 w-2 bg-primary" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-7"><h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Tu edificio no puede quedarse <span className="text-primary">quieto.</span></h2></Reveal>
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={waLink(profile?.msg ?? HERO_MSG)} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground hover:brightness-110"><MessageCircle className="h-5 w-5" /> WhatsApp</a>
              <a href={`tel:${SITE.phoneE164}`} className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-md border border-ink-muted/40 px-6 text-sm font-bold hover:border-ink-foreground"><Phone className="h-5 w-5" /> Llamar</a>
            </div>
            {HOME_STATS.horasRespuesta != null && (
              <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted"><ShieldCheck className="h-4 w-4 text-primary" /> Respuesta en menos de {HOME_STATS.horasRespuesta} horas hábiles</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function HeroMedia() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  return (
    <div className="relative lg:col-span-6">
      <div className="relative h-[340px] overflow-hidden rounded-lg sm:h-[440px] lg:absolute lg:inset-y-0 lg:-right-[max(0px,calc((100vw-80rem)/2))] lg:left-0 lg:h-auto lg:rounded-none">
        <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y }}>
          <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: [0.22, 0.7, 0.2, 1] }} src={IMG.lobby} alt="Lobby arquitectónico con ascensores en acero inoxidable" className="h-full w-full object-cover" fetchPriority="high" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 left-6 hidden w-56 overflow-hidden rounded-lg border-4 border-ink shadow-2xl sm:block lg:bottom-12 lg:-left-16">
        <img src={IMG.cabina} alt="Cabina de pasajeros" loading="lazy" className="h-40 w-full object-cover" />
      </motion.div>
    </div>
  );
}
