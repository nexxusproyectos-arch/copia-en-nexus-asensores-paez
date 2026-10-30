import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact.functions";
const valid = { nombre: "Ana Pérez", telefono: "3219005713", servicio: "Contacto web", mensaje: "Necesito mantenimiento", acepta: true };
describe("single-view contact requirements", () => {
  it("requires full name", () => { expect(contactSchema.safeParse({ ...valid, nombre: "" }).success).toBe(false); });
  it("requires phone", () => { expect(contactSchema.safeParse({ ...valid, telefono: "" }).success).toBe(false); });
  it("requires request", () => { expect(contactSchema.safeParse({ ...valid, mensaje: "" }).success).toBe(false); });
  it("requires consent", () => { expect(contactSchema.safeParse({ ...valid, acepta: false }).success).toBe(false); });
  it("allows omitted email, company and city", () => { expect(contactSchema.safeParse(valid).success).toBe(true); });
  it("retains optional company and city", () => { expect(contactSchema.parse({ ...valid, empresa: "Edificio Central", ciudad: "Bogotá" })).toMatchObject({ empresa: "Edificio Central", ciudad: "Bogotá" }); });
});
