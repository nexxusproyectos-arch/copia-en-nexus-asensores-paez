import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, ArrowLeft, ArrowRight, Building, Building2, Check, Factory, FileCheck2, Home, Hospital, MessageCircle, RefreshCw, Sparkles, Store, Wrench } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";
import { waLink } from "@/lib/site";

export const NEEDS = [
  { id: "Equipo nuevo", icon: Sparkles },
  { id: "Mantenimiento", icon: Wrench },
  { id: "Modernización", icon: RefreshCw },
  { id: "Certificación NTC 5926", icon: FileCheck2 },
  { id: "Emergencia / reparación", icon: AlertTriangle },
] as const;

const PROPERTIES = [
  { id: "Conjunto residencial", icon: Building },
  { id: "Edificio de oficinas", icon: Building2 },
  { id: "Comercio / industria", icon: Factory },
  { id: "Clínica", icon: Hospital },
  { id: "Casa", icon: Home },
] as const;

export function buildQuoteMessage(a: { need: string; property: string; floors: number; hasEquipment: boolean | null; nombre: string; telefono: string; correo?: string }) {
  return [
    "Hola, Ascensores Páez. Acabo de enviar una solicitud desde la web:",
    `• Necesito: ${a.need}`,
    `• Inmueble: ${a.property}`,
    `• Pisos: ${a.floors}`,
    `• ¿Ya tiene equipo?: ${a.hasEquipment === null ? "No indicado" : a.hasEquipment ? "Sí" : "No"}`,
    `• Nombre: ${a.nombre}`,
    `• Teléfono: ${a.telefono}`,
    a.correo ? `• Correo: ${a.correo}` : null,
  ].filter(Boolean).join("\n");
}

const card = "flex min-h-14 items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-bold transition";
const on = "border-primary bg-primary/5";
const off = "border-border hover:border-foreground";

export function Cotizador({ preset }: { preset?: { need: string; n: number } }) {
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState("");
  const [property, setProperty] = useState("");
  const [floors, setFloors] = useState(5);
  const [hasEq, setHasEq] = useState<boolean | null>(null);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const send = useServerFn(submitContact);

  useEffect(() => {
    if (preset?.need) { setNeed(preset.need); setStep(2); setDone(false); }
  }, [preset?.n, preset?.need]);

  const answers = { need, property, floors, hasEquipment: hasEq, nombre: nombre.trim(), telefono: telefono.trim(), correo: correo.trim() };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (nombre.trim().length < 2) return setError("Escribe tu nombre");
    if (!/^[0-9+\s()-]{7,20}$/.test(telefono.trim())) return setError("Teléfono no válido");
    if (!acepta) return setError("Debes aceptar la política de datos");
    setSending(true);
    try {
      await send({ data: { nombre, telefono, correo, servicio: need, mensaje: `[Cotizador web] ${buildQuoteMessage(answers)}`, acepta: true } });
      setDone(true);
    } catch {
      setError("No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  const floorsLabel = ["Qué necesitas", "Tu inmueble", "Tus datos"];

  return (
    <section id="cotizador" className="scroll-mt-20 border-b border-border bg-muted py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Cotizador</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Cotiza en 60 segundos.</h2>
          <p className="mt-4 text-muted-foreground">Responde 3 preguntas y un asesor te contacta con una propuesta para tu proyecto.</p>
        </div>
        <div className="rounded-lg bg-background p-6 shadow-sm md:p-8 lg:col-span-8">
          {done ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-7 w-7" /></div>
              <h3 className="mt-5 text-2xl font-extrabold">¡Solicitud recibida, {nombre.split(" ")[0]}!</h3>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">Te contactaremos pronto. Si quieres agilizar, continúa la conversación por WhatsApp con tus respuestas ya escritas.</p>
              <a href={waLink(buildQuoteMessage(answers))} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-whatsapp px-6 py-3.5 text-sm font-bold text-ink-foreground">
                <MessageCircle className="h-5 w-5" /> Continuar por WhatsApp
              </a>
            </div>
          ) : (
            <>
              <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Progreso">
                {floorsLabel.map((l, i) => (
                  <li key={l}>
                    <div className={`h-1.5 rounded-full ${step > i ? "bg-primary" : "bg-border"}`} />
                    <span className={`mt-2 block text-xs font-bold ${step === i + 1 ? "text-foreground" : "text-muted-foreground"}`}>Piso {i + 1} <span className="hidden font-semibold sm:inline">· {l}</span></span>
                  </li>
                ))}
              </ol>

              {step === 1 && (
                <div>
                  <h3 className="text-lg font-extrabold">¿Qué necesitas?</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {NEEDS.map(({ id, icon: Icon }) => (
                      <button key={id} type="button" onClick={() => { setNeed(id); setStep(2); }} className={`${card} ${need === id ? on : off}`}>
                        <Icon className="h-6 w-6 shrink-0 text-primary" /> {id}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-extrabold">Tipo de inmueble</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {PROPERTIES.map(({ id, icon: Icon }) => (
                      <button key={id} type="button" onClick={() => setProperty(id)} className={`${card} ${property === id ? on : off}`}>
                        <Icon className="h-6 w-6 shrink-0 text-primary" /> {id}
                      </button>
                    ))}
                  </div>
                  <label className="mt-7 block text-sm font-bold" htmlFor="pisos">Número de pisos: <span className="text-primary">{floors}{floors === 40 ? "+" : ""}</span></label>
                  <input id="pisos" type="range" min={1} max={40} value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="mt-3 w-full accent-primary" />
                  <p className="mt-6 text-sm font-bold">¿Ya tiene equipo instalado?</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-xs">
                    {[true, false].map((v) => (
                      <button key={String(v)} type="button" onClick={() => setHasEq(v)} className={`${card} justify-center ${hasEq === v ? on : off}`}>{v ? "Sí" : "No"}</button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Atrás</button>
                    <button type="button" disabled={!property} onClick={() => setStep(3)} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground disabled:opacity-40">Siguiente <ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={submit} noValidate>
                  <h3 className="text-lg font-extrabold">¿A quién contactamos?</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre *" maxLength={100} className="min-h-12 rounded-md border border-input px-4" aria-label="Nombre" />
                    <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono *" type="tel" maxLength={20} className="min-h-12 rounded-md border border-input px-4" aria-label="Teléfono" />
                    <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo (opcional)" type="email" maxLength={255} className="min-h-12 rounded-md border border-input px-4 sm:col-span-2" aria-label="Correo" />
                  </div>
                  <label className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} className="mt-1 accent-primary" />
                    <span>Autorizo el tratamiento de mis datos según la <a href="/politica-de-privacidad" className="underline">política de privacidad</a>.</span>
                  </label>
                  {error && <p className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
                  <div className="mt-8 flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Atrás</button>
                    <button type="submit" disabled={sending} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground disabled:opacity-60">{sending ? "Enviando…" : "Enviar solicitud"}</button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
