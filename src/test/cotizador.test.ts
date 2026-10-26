import { describe, expect, it } from "vitest";
import { buildQuoteMessage } from "@/components/site/Cotizador";

describe("cotizador WhatsApp summary", () => {
  it("includes every answer", () => {
    const m = buildQuoteMessage({ need: "Certificación NTC 5926", property: "Casa", floors: 7, hasEquipment: true, nombre: "Ana", telefono: "3001234567", correo: "a@b.co" });
    for (const s of ["Certificación NTC 5926", "Casa", "Pisos: 7", "Sí", "Ana", "3001234567", "a@b.co"]) expect(m).toContain(s);
  });
});
