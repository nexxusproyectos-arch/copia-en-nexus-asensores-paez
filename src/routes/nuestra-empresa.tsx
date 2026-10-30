import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Handshake, ShieldCheck } from "lucide-react";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/nuestra-empresa")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Nuestra Empresa | Ascensores Páez S.A.S." },
      { name: "description", content: "Somos una compañía especializada en la instalación, modernización, mantenimiento preventivo y correctivo de ascensores y puertas automáticas vehiculares a nivel nacional." },
      { property: "og:title", content: "Nuestra Empresa | Ascensores Páez S.A.S." },
      { property: "og:description", content: "Líderes en ingeniería, calidad y seguridad vertical." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/nuestra-empresa" }],
  }),
  component: About,
});

const BENEFITS = [
  { icon: Cpu, title: "Tecnología avanzada", text: "Incorporación de sistemas actualizados y seguros en cada intervención." },
  { icon: Handshake, title: "Servicio cercano", text: "Enfoque en una atención personalizada y oportuna para cada cliente." },
  { icon: ShieldCheck, title: "Operación garantizada", text: "Respaldo técnico continuo que asegura el correcto funcionamiento y la seguridad de cada equipo, contribuyendo a la creación de espacios eficientes." },
];

function About() {
  const reduce = useReducedMotion();
  return <>
    <section className="py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.img src={IMG.camillero} alt="Técnico acompañando a una persona en un ascensor camillero" width={720} height={760} initial={false} whileInView={{ opacity: [0.85, 1], y: reduce ? 0 : [12, 0] }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="aspect-[5/4] w-full rounded-lg object-cover lg:aspect-[4/5]" />
        <div>
          <p className="text-xs font-extrabold text-primary after:mt-3 after:block after:h-0.5 after:w-12 after:bg-primary">QUIÉNES SOMOS</p>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight md:text-4xl">Líderes en ingeniería, calidad y seguridad vertical.</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">Somos una compañía especializada en la instalación, modernización, mantenimiento preventivo y correctivo de ascensores y puertas automáticas vehiculares a nivel nacional. Contamos con <strong className="font-bold text-foreground">respaldo profesional en dirección técnica y un equipo operativo altamente capacitado</strong>, comprometidos con el uso de componentes certificados de alta calidad y la ejecución precisa de cada uno de nuestros proyectos. Orientamos nuestra experiencia para asegurar que sus sistemas operen con total seguridad y bajo el estricto cumplimiento de las normativas vigentes (NTC 5926-1 y NTC 5926-3).</p>
        </div>
      </div>
    </section>
    <section className="border-t border-border py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-extrabold md:text-4xl">Reseña Histórica</h2>
        <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
          <p><strong className="font-bold text-foreground">Ascensores Páez S.A.S.</strong> nació en diciembre de 2018 con el firme propósito de ofrecer soluciones en transporte vertical que fueran verdaderamente seguras, confiables y modernas. Desde sus inicios, la compañía identificó la necesidad de mejorar la experiencia y la tranquilidad de los usuarios de ascensores y puertas automáticas en los sectores residencial, comercial e industrial.</p>
          <p>Respaldada por un equipo técnico altamente especializado y comprometido, la empresa inició operaciones ofreciendo servicios de mantenimiento, modernización e instalación de equipos, priorizando siempre la calidad, la innovación y la confianza como sus pilares fundamentales.</p>
          <p>En pocos años, la compañía se ha consolidado como un aliado estratégico para diversos sectores del mercado nacional, destacándose por:</p>
        </div>
        <div className="my-10 grid gap-6 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-lg border border-border p-7"><Icon className="size-8 text-primary" strokeWidth={1.5} /><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></div>)}
        </div>
        <p className="leading-relaxed text-muted-foreground">Hoy en día, Ascensores Páez S.A.S. mantiene firme su visión de ser un referente indiscutible en el sector. A través de la innovación y la excelencia técnica, la compañía continúa acompañando a sus clientes en cada proyecto, asegurando que sigan subiendo juntos con total confianza.</p>
      </div>
    </section>
    <section className="pb-16 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
        <div className="rounded-lg border-t-4 border-primary bg-ink p-8 text-ink-foreground lg:p-10"><h2 className="text-2xl font-extrabold">Misión</h2><p className="mt-5 leading-relaxed">Diseñamos y conectamos soluciones en transporte vertical y accesos automáticos que combinan seguridad, innovación y la más alta calidad. Nuestro compromiso es acompañar a nuestros clientes en cada proyecto, aportando confianza y tecnología avanzada para que cada espacio se mueva con total precisión y tranquilidad.</p></div>
        <div className="rounded-lg border-t-4 border-primary bg-ink p-8 text-ink-foreground lg:p-10"><h2 className="text-2xl font-extrabold">Visión</h2><p className="mt-5 leading-relaxed">Ser la compañía referente que transforma la experiencia de movilidad vertical y automatización en edificaciones, creando estándares de confianza y modernidad que eleven la calidad de vida y el valor de cada proyecto a nivel nacional e internacional.</p></div>
      </div>
    </section>
  </>;
}
