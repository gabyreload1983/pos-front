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
  .refine(
    (data) => {
      const esCF = data.condicion_iva_id === CONSUMIDOR_FINAL_ID;

      if (esCF) {
        return !!data.nombre?.trim() && !!data.apellido?.trim();
      }

      const razonOk = !!data.razon_social?.trim();
      const tipoDocOk = data.tipo_documento_id === TIPO_DOCUMENTO_CUIT_ID;
      const cuitOk = !!data.documento?.match(/^\d{11}$/);

      return razonOk && tipoDocOk && cuitOk;
    },
    {
      message: "Debe completar los campos requeridos según el tipo de cliente.",
      path: ["condicion_iva_id"],
    }
  );
