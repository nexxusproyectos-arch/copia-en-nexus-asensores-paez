import { useEffect, useState } from "react";
import { Siren, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
const KEY = "urgency-bar-dismissed";
export function UrgencyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(sessionStorage.getItem(KEY) !== "1"); }, []);
  if (!show) return null;
  return <div className="relative bg-primary text-primary-foreground">
    <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-10 py-2 text-center text-xs font-semibold sm:text-sm">
      <Siren className="h-4 w-4 shrink-0" />
      <span>Emergencias 24/7 (Solo Clientes con Contrato): <a href={`tel:${SITE.phoneE164}`} className="inline-block font-extrabold underline underline-offset-2">{SITE.phoneLocal}</a></span>
      <Button variant="ghost" size="icon" aria-label="Cerrar aviso" className="absolute right-2 h-7 w-7 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground" onClick={() => { sessionStorage.setItem(KEY, "1"); setShow(false); }}><X /></Button>
    </div>
  </div>;
}
