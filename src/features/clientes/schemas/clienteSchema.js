import { z } from "zod";

export const clienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),

  razon_social: z.string().optional().nullable(),
  tipo_documento: z
    .union([
      z.enum(["DNI", "CUIT", "CUIL", "Pasaporte"]),
      z.literal(""),
      z.null(),
    ])
    .transform((v) => (v === "" ? null : v))
    .optional(),
  numero_documento: z.string().optional().nullable(),

  email: z
    .union([z.string().email("Email inválido"), z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .optional(),

  telefono: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  cuit: z.string().optional().nullable(),

  provincia_id: z
    .union([z.coerce.number().int().positive(), z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .optional(),

  ciudad_id: z
    .union([z.coerce.number().int().positive(), z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .optional(),

  condicion_iva_id: z
    .union([z.coerce.number().int().positive(), z.literal(""), z.null()])
    .transform((v) => (v === "" ? null : v))
    .optional(),

  activo: z.union([z.literal(1), z.literal(0)]).optional(),
});
