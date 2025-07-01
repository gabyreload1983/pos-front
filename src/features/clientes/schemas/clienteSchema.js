import { z } from "zod";

// Estos valores deben ser sincronizados dinámicamente en tiempo real,
// pero para validación local, los incluimos aquí.
const CONSUMIDOR_FINAL_ID = 1;
const TIPO_DOCUMENTO_CUIT_ID = 2;
export const clienteSchema = z
  .object({
    nombre: z.string().optional().nullable(),
    apellido: z.string().optional().nullable(),
    razon_social: z.string().optional().nullable(),

    tipo_documento_id: z
      .union([z.coerce.number().int().positive(), z.literal(""), z.null()])
      .transform((v) => (v === "" ? null : v))
      .optional(),

    documento: z
      .string()
      .optional()
      .nullable()
      .transform((v) => (v === "" ? null : v)),

    email: z
      .union([z.string().email("Email inválido"), z.literal(""), z.null()])
      .transform((v) => (v === "" ? null : v))
      .optional(),

    telefono: z.string().optional().nullable(),
    direccion: z.string().optional().nullable(),

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
  })
  .superRefine((data, ctx) => {
    const esCF = data.condicion_iva_id === CONSUMIDOR_FINAL_ID;

    if (esCF) {
      if (!data.nombre?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["nombre"],
          message: "El nombre es obligatorio para Consumidor Final",
        });
      }
      if (!data.apellido?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["apellido"],
          message: "El apellido es obligatorio para Consumidor Final",
        });
      }
    } else {
      if (!data.razon_social?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["razon_social"],
          message: "La razón social es obligatoria",
        });
      }

      if (data.tipo_documento_id !== TIPO_DOCUMENTO_CUIT_ID) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tipo_documento_id"],
          message: "Debe seleccionar CUIT como tipo de documento",
        });
      }

      if (!data.documento?.match(/^\d{11}$/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["documento"],
          message: "El CUIT debe tener 11 dígitos numéricos",
        });
      }
    }
  });
