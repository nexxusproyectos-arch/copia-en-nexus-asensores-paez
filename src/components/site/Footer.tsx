import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { IMG } from "@/lib/images";
import { MASTER_SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink pb-24 text-ink-foreground lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded-md bg-background p-3">
            <img src={IMG.logo} alt="Logo Ascensores Páez S.A.S." className="h-14 w-auto" loading="lazy" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            Servicios de transporte vertical y automatización de accesos. Bogotá, Colombia, desde {SITE.founded.toLowerCase()}.
          </p>
        </div>
        <div>
          <h3 className="eyebrow">Servicios</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {MASTER_SERVICES.map((s) => (
              <li key={s.slug}><Link to="/servicios/$slug" params={{ slug: s.slug }} className="hover:text-ink-foreground">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow">Empresa</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li><Link to="/" className="hover:text-ink-foreground">Inicio</Link></li>
            <li><Link to="/nuestra-empresa" className="hover:text-ink-foreground">Nuestra Empresa</Link></li>
            <li><Link to="/contacto" className="hover:text-ink-foreground">Contacto</Link></li>
            <li><Link to="/politica-de-privacidad" className="hover:text-ink-foreground">Política de privacidad</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /><a href={`tel:${SITE.phoneE164}`} className="hover:text-ink-foreground">{SITE.phoneDisplay}</a></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /><a href={`tel:${SITE.secondaryPhoneE164}`} aria-label={`Llamar al número secundario ${SITE.secondaryPhoneDisplay}`} className="hover:text-ink-foreground">{SITE.secondaryPhoneDisplay}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /><a href={`mailto:${SITE.email}`} className="break-all hover:text-ink-foreground">{SITE.email}</a></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{SITE.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-muted/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name} Todos los derechos reservados.</span>
          <Link to="/politica-de-privacidad" className="hover:text-ink-foreground">Tratamiento de datos personales</Link>
        </div>
      </div>
    </footer>
  );
}
