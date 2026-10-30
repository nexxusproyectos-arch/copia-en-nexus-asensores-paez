import { Reveal } from "./motion";

const TESTIMONIALS = [
  { name: "Andrés Aparicio Cortés", role: "Admón. Love Me Jeans", text: "Es una empresa confiable que siempre está ahí para brindarte el apoyo en sus servicios y darte la mejor solución." },
  { name: "Alejandro González", role: "Gerente Asistencia Plus Colombia S.A.S", text: "Ascensores Páez es una compañía evidentemente temerosa de Dios y que la conocí precisamente porque nos une ese vínculo. Es una compañía en ASCENSO cómo lo dice su razón social, una compañía seria, profesional y que sabe perfectamente lo que hace." },
  { name: "Leonardo La Torre", role: "Admón. SERVICIOS ADOM S.A.S", text: "Ascensores Páez es una empresa seria con la cual tenemos soporte las 24 horas del día y su compromiso en el tiempo que tenemos vinculación comercial, se nota la experiencia, puntualidad y calidad en el servicio prestado." },
];

const initials = (n: string) => n.split(" ").slice(0, 2).map((w) => w[0]).join("");
export function Testimonials() {
  return <section id="testimonios" className="scroll-mt-20 bg-muted py-16 lg:py-20"><div className="mx-auto max-w-7xl px-5">
    <Reveal><p className="eyebrow">Testimonios</p><h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Lo que dicen nuestros clientes.</h2></Reveal>
    <div className="mt-10 grid gap-6 lg:grid-cols-3">{TESTIMONIALS.map((t) => <figure key={t.name} className="flex flex-col justify-between rounded-lg border-t-4 border-primary bg-background p-7"><blockquote className="text-base leading-relaxed">“{t.text}”</blockquote><figcaption className="mt-8 flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-ink-foreground">{initials(t.name)}</span><span><span className="block font-extrabold">{t.name}</span><span className="text-sm text-muted-foreground">{t.role}</span></span></figcaption></figure>)}</div>
    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-border pt-8 text-lg font-extrabold text-muted-foreground" aria-label="Clientes"><span>Love Me Jeans</span><span aria-hidden="true">·</span><span>Asistencia Plus</span><span aria-hidden="true">·</span><span>Servicios ADOM</span></div>
  </div></section>;
}
