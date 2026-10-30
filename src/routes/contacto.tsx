import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE, waLink } from "@/lib/site";
import { contactSchema, submitContact } from "@/lib/contact.functions";
import { WhatsAppButton } from "@/components/site/WhatsApp";
import { trackEvent } from "@/lib/tracking";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Ascensores Páez S.A.S. Bogotá" },
      { name: "description", content: "Contacta a Ascensores Páez S.A.S. por WhatsApp al +57 321 900 5713, correo o formulario. Ac. 153 #103b-76, Bogotá." },
      { property: "og:title", content: "Contacto | Ascensores Páez" },
      { property: "og:description", content: "Escríbenos por WhatsApp o déjanos tus datos y te contactamos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contact,
});

type Errors = Partial<Record<"nombre" | "telefono" | "correo" | "servicio" | "mensaje" | "acepta", string>>;
const input = "w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Contact() {
  const send = useServerFn(submitContact);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      nombre: String(fd.get("nombre") ?? ""),
      telefono: String(fd.get("telefono") ?? ""),
      correo: String(fd.get("correo") ?? ""),
      servicio: String(fd.get("servicio") ?? ""),
      mensaje: String(fd.get("mensaje") ?? ""),
      acepta: fd.get("acepta") === "on",
    };
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await send({ data: parsed.data });
      trackEvent("Lead");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="bg-ink py-16 text-ink-foreground lg:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">Contacto</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">Hablemos de tu proyecto.</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">La forma más rápida es WhatsApp. También puedes dejarnos tus datos y te contactamos.</p>
        </div>
      </section>
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12">
          <aside className="space-y-8 lg:col-span-4">
            <WhatsAppButton message="Hola, Ascensores Páez. Quiero hablar con un asesor." label="Escribir por WhatsApp" className="w-full" />
            <ul className="space-y-5 text-sm">
              <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><div><span className="block font-bold">Teléfono / WhatsApp</span><a href={`tel:${SITE.phoneE164}`} className="text-muted-foreground hover:text-foreground">{SITE.phoneDisplay}</a></div></li>
              <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /><div><span className="block font-bold">Correo</span><a href={`mailto:${SITE.email}`} className="break-all text-muted-foreground hover:text-foreground">{SITE.email}</a></div></li>
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /><div><span className="block font-bold">Dirección</span><span className="text-muted-foreground">{SITE.address}</span></div></li>
            </ul>
          </aside>
          <div className="lg:col-span-8">
            {status === "ok" ? (
              <div className="rounded-lg border border-border bg-muted p-10 text-center" role="status">
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 text-2xl font-extrabold">Recibimos tu solicitud</h2>
                <p className="mt-2 text-muted-foreground">Nuestro equipo se comunicará contigo. Si prefieres una respuesta inmediata, escríbenos por WhatsApp.</p>
                <a href={waLink("Hola, Ascensores Páez. Acabo de enviar el formulario de contacto.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-bold text-primary">Abrir WhatsApp</a>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-lg border border-border p-6 sm:grid-cols-2 md:p-10">
                <Field label="Nombre *" name="nombre" error={errors.nombre}><input id="nombre" name="nombre" className={input} maxLength={100} autoComplete="name" /></Field>
                <Field label="Teléfono *" name="telefono" error={errors.telefono}><input id="telefono" name="telefono" type="tel" className={input} maxLength={20} autoComplete="tel" /></Field>
                <Field label="Correo" name="correo" error={errors.correo}><input id="correo" name="correo" type="email" className={input} maxLength={255} autoComplete="email" /></Field>
                <Field label="Servicio de interés *" name="servicio" error={errors.servicio}>
                  <select id="servicio" name="servicio" className={input} defaultValue="">
                    <option value="" disabled>Selecciona…</option>
                    {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                    <option value="Otro">Otro</option>
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Mensaje *" name="mensaje" error={errors.mensaje}><textarea id="mensaje" name="mensaje" rows={5} className={input} maxLength={1000} /></Field>
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-muted-foreground">
                    <input type="checkbox" name="acepta" className="mt-1 h-4 w-4 accent-primary" />
                    <span>Autorizo el tratamiento de mis datos según la <Link to="/politica-de-privacidad" className="font-semibold text-foreground underline">política de privacidad</Link>.</span>
                  </label>
                  {errors.acepta && <p className="mt-1 text-xs text-destructive">{errors.acepta}</p>}
                </div>
                {status === "error" && <p className="text-sm text-destructive sm:col-span-2" role="alert">No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.</p>}
                <button type="submit" disabled={status === "loading"} className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:brightness-110 disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
                  {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />} Enviar solicitud
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
