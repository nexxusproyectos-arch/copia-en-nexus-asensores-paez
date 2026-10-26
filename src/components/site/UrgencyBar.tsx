import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";

const KEY = "urgency-bar-dismissed";

export function UrgencyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(sessionStorage.getItem(KEY) !== "1");
  }, []);
  if (!show) return null;
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2 text-xs font-semibold sm:text-sm">
        <span>¿Ascensor detenido? Atención de emergencias</span>
        <a href={`tel:${SITE.phoneE164}`} className="inline-flex items-center gap-1 font-extrabold underline underline-offset-2">
          <Phone className="h-3.5 w-3.5" /> Llamar ahora
        </a>
        <button
          aria-label="Cerrar aviso"
          className="absolute right-3 rounded p-1 hover:bg-primary-foreground/15"
          onClick={() => {
            sessionStorage.setItem(KEY, "1");
            setShow(false);
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
