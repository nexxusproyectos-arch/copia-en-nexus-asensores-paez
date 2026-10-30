import { FileCheck2 } from "lucide-react";
import { Reveal } from "./motion";
import { WhatsAppButton } from "./WhatsApp";

export function NormativeSection() {
  return <section id="normativa" className="scroll-mt-20 border-y border-border bg-muted py-16 lg:py-20">
    <Reveal className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[auto_1fr]">
      <FileCheck2 className="h-12 w-12 text-primary" />
      <div><h2 className="max-w-4xl text-3xl font-extrabold leading-tight md:text-4xl">Evite sanciones y riesgos: Adecuamos sus equipos bajo la norma NTC 5926</h2><p className="mt-6 max-w-4xl leading-relaxed text-muted-foreground">En Colombia, la revisión técnico-mecánica de sistemas de transporte vertical y puertas automáticas es obligatoria. Nos encargamos de la corrección precisa de los hallazgos mecánicos y eléctricos emitidos por los entes inspectores, dejando sus equipos listos para superar la certificación sin contratiempos.</p><div className="mt-8"><WhatsAppButton message="Hola, necesito cotizar la corrección de hallazgos NTC 5926" label="Cotizar Corrección de Hallazgos por WhatsApp" /></div></div>
    </Reveal>
  </section>;
}