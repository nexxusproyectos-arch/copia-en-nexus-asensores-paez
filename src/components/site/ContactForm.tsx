import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, submitContact } from "@/lib/contact.functions";
import { trackEvent } from "@/lib/tracking";
import { CONTACT_SERVICES, contactWhatsAppMessage } from "@/lib/contact-details";
import { WhatsAppButton } from "./WhatsApp";

const inputClass = "w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactForm({ contactPage = false, initialService = "" }: { contactPage?: boolean; initialService?: string }) {
  const send = useServerFn(submitContact);
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Partial<Record<"nombre" | "telefono" | "correo" | "empresa" | "ciudad" | "servicio" | "mensaje" | "acepta", string>>>({});
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const fd = new FormData(form);
    const value = (key: string) => String(fd.get(key) ?? "");
    const parsed = contactSchema.safeParse({ nombre: value("nombre"), telefono: value("telefono"), correo: value("correo"), empresa: value("empresa"), ciudad: value("ciudad"), mensaje: value("mensaje"), servicio: contactPage ? value("servicio") : "Contacto web", acepta: fd.get("acepta") === "on" });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({}); setStatus("loading");
    try {
      await send({ data: parsed.data });
      trackEvent("Lead");
      setWhatsappMessage(contactWhatsAppMessage(parsed.data));
      setStatus("ok"); form.reset();
    } catch { setStatus("error"); }
  }
  return status === "ok" ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center" role="status">
    <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16 text-primary" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="3" /><motion.path d="M17 32L27 42L47 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} /></svg>
    <h3 className="mt-5 text-2xl font-extrabold">Recibimos su solicitud</h3>
    <p className="mt-3 text-muted-foreground">Nuestro equipo se comunicará con usted.</p>
    {contactPage && <div className="mt-6"><WhatsAppButton message={whatsappMessage} label="Chatear por WhatsApp" /></div>}
  </motion.div> : <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
    <Field label="Nombre y Apellido" name="nombre" error={errors.nombre}><input id="form-nombre" name="nombre" className={inputClass} maxLength={100} autoComplete="name" required aria-invalid={!!errors.nombre} /></Field>
    <Field label="Teléfono / WhatsApp" name="telefono" error={errors.telefono}><input id="form-telefono" name="telefono" type="tel" className={inputClass} maxLength={20} autoComplete="tel" required aria-invalid={!!errors.telefono} /></Field>
    <Field label="Correo" name="correo" error={errors.correo}><input id="form-correo" name="correo" type="email" className={inputClass} maxLength={255} autoComplete="email" /></Field>
    <Field label="Nombre del Edificio o Empresa" name="empresa" error={errors.empresa}><input id="form-empresa" name="empresa" className={inputClass} maxLength={150} autoComplete="organization" /></Field>
    <Field label="Ciudad" name="ciudad" error={errors.ciudad}><input id="form-ciudad" name="ciudad" className={inputClass} maxLength={100} autoComplete="address-level2" /></Field>
    {contactPage && <Field label="Servicio de interés" name="servicio" error={errors.servicio}><select id="form-servicio" name="servicio" className={inputClass} defaultValue={initialService} required aria-invalid={!!errors.servicio}><option value="" disabled>Seleccione...</option>{CONTACT_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}</select></Field>}
    <div className="sm:col-span-2"><Field label="¿En qué le podemos ayudar?" name="mensaje" error={errors.mensaje}><textarea id="form-mensaje" name="mensaje" rows={6} className={inputClass} maxLength={1000} required aria-invalid={!!errors.mensaje} /></Field></div>
    <div className="sm:col-span-2"><label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" name="acepta" required className="mt-1 h-4 w-4 accent-primary" /><span>Autorizo el tratamiento de mis datos según la <Link to="/politica-de-privacidad" className="font-semibold text-foreground underline">política de privacidad</Link>.</span></label>{errors.acepta && <p className="mt-2 text-xs text-destructive">{errors.acepta}</p>}</div>
    {status === "error" && <p className="text-sm text-destructive sm:col-span-2" role="alert">No pudimos enviar su solicitud. Intente de nuevo o escríbanos por WhatsApp.</p>}
    <Button type="submit" disabled={status === "loading"} className="h-auto min-h-12 whitespace-normal px-6 py-3.5 font-bold sm:col-span-2 sm:justify-self-start">{status === "loading" && <Loader2 className="animate-spin" />}Enviar datos de contacto</Button>
  </form>;
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string | undefined; children: ReactNode }) {
  return <div><label htmlFor={`form-${name}`} className="mb-2 block text-sm font-bold">{label}</label>{children}{error && <p className="mt-2 text-xs text-destructive">{error}</p>}</div>;
}