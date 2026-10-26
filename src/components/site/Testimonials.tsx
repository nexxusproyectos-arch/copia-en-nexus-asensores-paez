import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { CLIENT_LOGOS, HOME_STATS } from "@/lib/site";

const TESTIMONIALS = [
  { name: "Andrés Aparicio Cortés", role: "Admón. Love Me Jeans", text: "Es una empresa confiable que siempre está ahí para brindarte el apoyo en sus servicios y darte la mejor solución." },
  { name: "Alejandro González", role: "Gerente Asistencia Plus Colombia S.A.S", text: "Ascensores Páez es una compañía evidentemente temerosa de Dios y que la conocí precisamente porque nos une ese vínculo. Es una compañía en ASCENSO cómo lo dice su razón social, una compañía seria, profesional y que sabe perfectamente lo que hace." },
  { name: "Leonardo La Torre", role: "Admón. SERVICIOS ADOM S.A.S", text: "Ascensores Páez es una empresa seria con la cual tenemos soporte las 24 horas del día y su compromiso en el tiempo que tenemos vinculación comercial, se nota la experiencia, puntualidad y calidad en el servicio prestado." },
];

const initials = (n: string) => n.split(" ").slice(0, 2).map((w) => w[0]).join("");

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    const el = ref.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (el && child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [i]);

  const g = HOME_STATS.googleRating;
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="overflow-hidden border-y border-border bg-background py-6" aria-label="Clientes">
        <div className="marquee flex w-max gap-6 hover:[animation-play-state:paused]">
          {logos.map((c, k) => (
            <div key={k} className="flex h-12 w-36 shrink-0 items-center justify-center rounded bg-muted text-xs font-bold text-muted-foreground">
              {c.logo ? <img src={c.logo} alt={c.name} className="max-h-10 w-auto grayscale" loading="lazy" /> : c.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Testimonios</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">Lo que dicen nuestros clientes.</h2>
          </div>
          {g && (
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-background px-4 py-2 text-sm font-bold">
              <Star className="h-4 w-4 fill-primary text-primary" /> {g.rating} en Google ({g.reviews} reseñas)
            </span>
          )}
        </div>
        <div
          ref={ref}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto"
        >
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex w-[88%] shrink-0 snap-start flex-col justify-between rounded-lg border-t-4 border-primary bg-background p-8 md:w-[calc(50%-12px)] lg:w-[calc(40%-12px)]">
              <div>
                <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed">“{t.text}”</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-ink-foreground">{initials(t.name)}</span>
                <span>
                  <span className="block font-extrabold">{t.name}</span>
                  <span className="text-sm text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          {TESTIMONIALS.map((t, k) => (
            <button key={t.name} onClick={() => setI(k)} aria-label={`Testimonio ${k + 1}`} className={`h-2 rounded-full transition-all ${i === k ? "w-8 bg-primary" : "w-2 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
