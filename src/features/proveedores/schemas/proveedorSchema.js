import { z } from "zod";

export const ProveedorSchema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    razon_social: z.string().min(1, "La Razón Social es obligatoria"),

    cuit: z.preprocess(
      (val) => (val === "" ? null : val),
      z
        .string()
        .regex(/^\d+$/, "El CUIT debe contener solo números")
        .nullable()
        .optional()
    ),

    email: z
      .union([z.string().email("Email inválido"), z.literal(""), z.null()])
      .transform((v) => (v === "" ? null : v))
      .optional(),

    telefono: z.string().optional().nullable(),
    direccion: z.string().optional().nullable(),

    ciudad_id: z
      .union([z.coerce.number().int().positive(), z.literal(""), z.null()])
      .transform((v) => (v === "" ? null : v))
      .optional(),

    provincia_id: z
      .union([z.coerce.number().int().positive(), z.literal(""), z.null()])
      .transform((v) => (v === "" ? null : v))
      .optional(),

    condicion_iva_id: z
      .union([z.coerce.number().int().positive(), z.literal(""), z.null()])
      .transform((v) => (v === "" ? null : v))
      .optional(),

    activo: z.union([z.literal(1), z.literal(0)]).optional(),
  })
  .refine(
    (data) => {
      const requiere11 = [2, 3, 4].includes(data.condicion_iva_id);
      const esConsFinal =
        data.condicion_iva_id === 1 || data.condicion_iva_id === null;

      if (requiere11) {
        return data.cuit && data.cuit.length === 11;
      }

      if (esConsFinal) {
        return (
          data.cuit === null ||
          data.cuit === undefined ||
          data.cuit.length === 8 ||
          data.cuit.length === 11
        );
      }

      return true;
    },
    {
      message:
        "El CUIT es obligatorio y debe tener 11 dígitos para esta condición IVA, o 8 u 11 si es Consumidor Final",
      path: ["cuit"],
    }
  );
