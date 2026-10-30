import { describe, expect, it } from "vitest";
import { contactWhatsAppMessage } from "@/lib/contact-details";
import { contactSchema } from "@/lib/contact.functions";

describe("contact page requirements", () => {
  const data = { nombre: "Ana Pérez", telefono: "3219005713", servicio: "Instalación", mensaje: "Solicito instalación de ascensor", acepta: true };
  it("requires a selected service", () => {
    expect(contactSchema.safeParse({ ...data, servicio: "" }).success).toBe(false);
    expect(contactSchema.safeParse(data).success).toBe(true);
  });
  it("includes the building or company in the WhatsApp request", () => {
    expect(contactWhatsAppMessage({ ...data, empresa: "Edificio Central" })).toContain("Nombre del Edificio o Empresa: Edificio Central");
  });
  it("includes the city in the WhatsApp request", () => {
    expect(contactWhatsAppMessage({ ...data, ciudad: "Bogotá" })).toContain("Ciudad: Bogotá");
  });
});