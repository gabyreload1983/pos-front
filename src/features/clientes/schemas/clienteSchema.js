import { z } from "zod";

export const clienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),

  razon_social: z.string().or(z.literal("")).or(z.null()).optional(),
  tipo_documento: z.enum(["DNI", "CUIT", "CUIL", "Pasaporte"]).default("DNI"),
  numero_documento: z.string().or(z.literal("")).or(z.null()).optional(),
  email: z.string().email("Email inválido").or(z.literal("")).or(z.null()),
  telefono: z.string().or(z.literal("")).or(z.null()).optional(),
  direccion: z.string().or(z.literal("")).or(z.null()).optional(),
  cuit: z.string().or(z.literal("")).or(z.null()).optional(),

  provincia_id: z.coerce.number().min(1, "Seleccioná una provincia"),
  ciudad_id: z.coerce.number().min(1, "Seleccioná una ciudad"),

  pais: z.string().or(z.literal("")).or(z.null()).default("Argentina"),

  condicion_iva: z
    .enum([
      "Responsable Inscripto",
      "Monotributo",
      "Consumidor Final",
      "Exento",
    ])
    .default("Consumidor Final"),
});
