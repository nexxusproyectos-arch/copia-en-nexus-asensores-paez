import { createFileRoute, Link } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ArrowRight, ArrowUpRight, ClipboardList, FileCheck2, Settings2, ShieldCheck, Wrench } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ElevatorIntro } from "@/components/site/ElevatorIntro";
import { Reveal } from "@/components/site/motion";
import { NormativeSection } from "@/components/site/NormativeSection";
import { ContactForm } from "@/components/site/ContactForm";
import { Button } from "@/components/ui/button";
import { IMG, IMG_POSITION } from "@/lib/images";
import { MASTER_SERVICES } from "@/lib/services";
import { contactServiceSelection } from "@/lib/contact-details";
import { WhatsAppButton, scrollToForm } from "@/components/site/WhatsApp";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  validateSearch: zodValidator(z.object({ servicio: fallback(z.string(), "").default("") })),
  search: { middlewares: [({ search, next }) => {
    const result = next(search);
    if (result["servicio"] === "") Reflect.deleteProperty(result, "servicio");
    return result;
  }] },
  head: () => ({
    meta: [
      { title: "Ascensores Páez S.A.S. | Transporte vertical, mantenimiento y adecuación técnica" },
      { name: "description", content: "Especialistas en transporte vertical: Seguridad, mantenimiento y adecuación técnica. Respaldo técnico especializado a nivel nacional." },
      { property: "og:title", content: "Ascensores Páez S.A.S. | Transporte vertical" },
      { property: "og:description", content: "Garantizamos la continuidad y el funcionamiento seguro de sus equipos con respaldo técnico especializado a nivel nacional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.lobby },
      { name: "twitter:image", content: IMG.lobby },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});
const TECHNICAL = [
  { icon: Wrench, title: "Mantenimiento en Transporte Vertical y Accesos", text: "Rutinas técnicas planificadas para prevenir fallas, prolongar la vida útil de sus equipos y garantizar la seguridad de los usuarios en sus ascensores, escaleras electromecánicas y puertas automáticas vehiculares.", slug: "mantenimiento" },
  { icon: Settings2, title: "Reparaciones Técnicas Especializadas", text: "Diagnóstico rápido y corrección inmediata de fallas mecánicas o eléctricas con repuestos de alta calidad. Brindamos soporte técnico prioritario para restablecer el flujo seguro en sus instalaciones.", slug: "reparaciones" },
  { icon: ShieldCheck, title: "Modernización Estética y Tecnológica", text: "Actualización de sistemas de control antiguos, optimización de componentes y renovación visual de cabinas de ascensores para mejorar el confort, la valorización del edificio y la eficiencia energética.", slug: "modernizacion" },
  { icon: FileCheck2, title: "Adecuación a la Norma NTC 5926", text: "Corregimos de forma precisa los hallazgos eléctricos y mecánicos emitidos por los entes inspectores bajo las normas NTC 5926-1 y NTC 5926-3, dejando sus equipos listos para su certificación.", slug: "adecuacion-normativa" },
];
function Home() {
  const { servicio } = Route.useSearch();
  const leadService = contactServiceSelection(servicio);
  return <>
    <ElevatorIntro />
    <section id="inicio" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 lg:grid-cols-12 lg:gap-0 lg:pb-0 lg:pt-0">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-7 lg:py-20 lg:pr-12">
          <p className="eyebrow">ASCENSORES PAEZ SAS</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] sm:text-5xl lg:text-5xl">
            <span className="line-mask"><span style={{ animationDelay: "0.9s" }}>Especialistas en transporte vertical:</span></span>{" "}
            <span className="line-mask"><span style={{ animationDelay: "0.98s" }}>Seguridad, mantenimiento</span></span>{" "}
            <span className="line-mask"><span className="text-primary" style={{ animationDelay: "1.06s" }}>y adecuación técnica.</span></span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">Garantizamos la continuidad y el funcionamiento seguro de sus equipos con respaldo técnico especializado a nivel nacional. Expertos en la adecuación de hallazgos mecánicos y eléctricos.</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <WhatsAppButton message="Hola, Ascensores Páez. Quiero cotizar y recibir asesoría sobre sus servicios." label="Cotizar y Asesorarme por WhatsApp" />
            <Button className="btn-shine h-auto min-h-12 whitespace-normal px-6 py-3.5 text-center font-bold" onClick={scrollToForm}><ClipboardList />Prefiero Dejar Datos en la Web</Button>
          </div>
        </div>
        <HeroMedia />
      </div>
    </section>
    <section id="servicios" className="scroll-mt-20 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><p className="eyebrow">Servicios</p></Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {MASTER_SERVICES.map((s) => <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background">
            <div className="relative aspect-[4/3] overflow-hidden"><img src={s.slug === "ascensores" ? IMG.cabina : s.image} alt={s.slug === "ascensores" ? "Cabina de ascensor de pasajeros" : s.imageAlt} loading="lazy" style={{ objectPosition: IMG_POSITION[s.slug === "ascensores" ? IMG.cabina : s.image] ?? "center" }} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" /><div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" /></div>
            <div className="flex flex-1 flex-col p-6"><h2 className="text-2xl font-extrabold">{s.name}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.short}</p><span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-primary">Ver servicio <ArrowRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span></div>
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
          </Link>)}
        </div>
      </div>
    </section>
    <NormativeSection />
    <section id="servicios-tecnicos" className="scroll-mt-20 bg-ink py-16 text-ink-foreground lg:py-20">
      <div className="mx-auto max-w-7xl px-5"><Reveal><p className="eyebrow">Soluciones de Ingeniería</p><h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Soluciones de Ingeniería.</h2></Reveal><div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {TECHNICAL.map((item, i) => {
          const Icon = item.icon;
          const body = <><div className="flex items-center justify-between"><Icon className="h-8 w-8 text-primary" /><span className="font-mono text-2xl text-ink-muted">0{i + 1}</span></div><h3 className="mt-6 text-2xl font-extrabold">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.text}</p><div className="mt-5 flex justify-end text-primary"><ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></>;
          const cls = "group block h-full border-t border-ink-muted/30 pt-6";
          return <Link key={item.title} to="/servicios/$slug" params={{ slug: item.slug }} className={cls}>{body}</Link>;
        })}
      </div></div>
    </section>
    <Testimonials />
    <section id="formulario" className="scroll-mt-24 py-16 lg:py-20"><div className="mx-auto max-w-4xl px-5"><Reveal><h2 className="text-3xl font-extrabold md:text-4xl">¿Prefiere que lo contactemos nosotros?</h2><p className="mt-5 leading-relaxed text-muted-foreground">Registre sus datos y un asesor técnico se comunicará con usted en el menor tiempo posible para revisar su requerimiento o agendar una visita técnica.</p></Reveal><div className="mt-10"><ContactForm key={leadService} leadService={leadService} /></div></div></section>
  </>;
}
function HeroMedia() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  const reduce = useReducedMotion();
  return <div className="relative lg:col-span-5">
    <div className="relative h-[340px] overflow-hidden rounded-lg sm:h-[440px] lg:absolute lg:inset-y-0 lg:-right-[max(0px,calc((100vw-80rem)/2))] lg:left-0 lg:h-auto lg:rounded-none"><motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: reduce ? 0 : y }}><motion.img initial={{ scale: reduce ? 1 : 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8 }} src={IMG.lobby} alt="Lobby arquitectónico con ascensores en acero inoxidable" className="h-full w-full object-cover" fetchPriority="high" /></motion.div><div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" /></div>
    <motion.div animate={{ y: reduce ? 0 : [0, -8, 0] }} transition={{ duration: 4, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }} className="absolute -bottom-6 left-6 hidden w-56 overflow-hidden rounded-lg border-4 border-ink shadow-2xl sm:block lg:bottom-12 lg:-left-12"><img src={IMG.cabina} alt="Cabina de pasajeros" loading="lazy" className="h-40 w-full object-cover" /></motion.div>
  </div>;
}
