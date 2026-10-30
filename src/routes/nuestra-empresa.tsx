import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { CtaBand } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/nuestra-empresa")({
  head: () => ({
    meta: [
      { title: "Nuestra Empresa | Ascensores Páez S.A.S., Bogotá desde 2018" },
      { name: "description", content: "Conoce la historia, misión, visión y valores de Ascensores Páez S.A.S., empresa bogotana de transporte vertical fundada en 2018." },
      { property: "og:title", content: "Nuestra Empresa | Ascensores Páez S.A.S." },
      { property: "og:description", content: "Empresa bogotana de transporte vertical y automatización de accesos desde 2018." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.pasillo },
      { name: "twitter:image", content: IMG.pasillo },
    ],
    links: [{ rel: "canonical", href: "/nuestra-empresa" }],
  }),
  component: About,
});

const VALUES = [
  { t: "Seguridad", d: "La protección de los usuarios guía cada trabajo." },
  { t: "Seriedad", d: "Cumplimos lo que acordamos con cada cliente." },
  { t: "Cercanía", d: "Atención personalizada y comunicación directa." },
  { t: "Compromiso", d: "Acompañamos a nuestros clientes en el tiempo." },
];

function About() {
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="eyebrow">Nuestra Empresa</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">Una compañía en ascenso.</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              {SITE.name} fue fundada en diciembre de 2018 en Bogotá, Colombia. Desde entonces ofrecemos soluciones de transporte vertical y automatización de accesos con un trato cercano y responsable.
            </p>
          </div>
          <img src={IMG.pasillo} alt="Pasillo con ascensores instalados" className="h-[360px] w-full rounded-lg object-cover" />
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
          <div className="rounded-lg border-t-4 border-primary bg-muted p-10">
            <h2 className="text-2xl font-extrabold">Misión</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Brindar soluciones de transporte vertical y automatización de accesos, con acompañamiento técnico, atención personalizada y la seguridad de los usuarios como prioridad.</p>
          </div>
          <div className="rounded-lg border-t-4 border-foreground bg-muted p-10">
            <h2 className="text-2xl font-extrabold">Visión</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Ser una empresa reconocida por su seriedad, su respaldo técnico y su compromiso con cada proyecto que acompaña.</p>
          </div>
        </div>
      </section>
      <section className="border-y border-border py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">Valores</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Lo que nos define.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.t} className="border-t-2 border-foreground pt-5"><h3 className="text-lg font-extrabold">{v.t}</h3><p className="mt-2 text-sm text-muted-foreground">{v.d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <img src={IMG.camillero} alt="Ascensor camillero en uso" loading="lazy" className="h-[380px] w-full rounded-lg object-cover" />
          <div>
            <p className="eyebrow">Compromiso de seguridad</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">La seguridad no se negocia.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Orientamos a nuestros clientes sobre la normativa técnica aplicable a sus equipos, incluidas las normas {SITE.norms}, y realizamos mantenimiento preventivo y correctivo para que los equipos operen de forma segura.
            </p>
          </div>
        </div>
      </section>
      <CtaBand message="Hola, Ascensores Páez. Quiero conocer más sobre sus servicios." />
    </>
  );
}
