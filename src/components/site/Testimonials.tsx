const TESTIMONIALS = [
  { name: "Andrés Aparicio Cortés", role: "Admón. Love Me Jeans", text: "Es una empresa confiable que siempre está ahí para brindarte el apoyo en sus servicios y darte la mejor solución." },
  { name: "Alejandro González", role: "Gerente Asistencia Plus Colombia S.A.S", text: "Ascensores Páez es una compañía evidentemente temerosa de Dios y que la conocí precisamente porque nos une ese vínculo. Es una compañía en ASCENSO cómo lo dice su razón social, una compañía seria, profesional y que sabe perfectamente lo que hace." },
  { name: "Leonardo La Torre", role: "Admón. SERVICIOS ADOM S.A.S", text: "Ascensores Páez es una empresa seria con la cual tenemos soporte las 24 horas del día y su compromiso en el tiempo que tenemos vinculación comercial, se nota la experiencia, puntualidad y calidad en el servicio prestado." },
];

export function Testimonials() {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Testimonios</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">Lo que dicen nuestros clientes.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between rounded-lg border-t-4 border-primary bg-background p-8">
              <blockquote className="text-base leading-relaxed">“{t.text}”</blockquote>
              <figcaption className="mt-8">
                <span className="block font-extrabold">{t.name}</span>
                <span className="text-sm text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
