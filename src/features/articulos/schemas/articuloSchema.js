import { z } from "zod";

export const articuloSchema = z.object({
  nombre: z.string().min(1).max(100),
  descripcion: z.string().max(65535).optional().nullable(),

  costo: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine((n) => n >= 0.1 && n <= 99999999.99, {
      message: "Debe ser un valor numérico mayor a 0",
    }),

  renta: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine((n) => n >= 0.1 && n <= 999.99, {
      message: "Debe ser un valor válido de renta",
    }),

  iva_aliquota_id: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine(Number.isInteger, { message: "Debe ser un número entero" }),

  moneda_id: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine(Number.isInteger, { message: "Debe ser un número entero" }),

  categoria_id: z
    .union([z.string(), z.number(), z.null()])
    .transform((val) => (val === "" || val === null ? null : Number(val)))
    .refine((val) => val === null || Number.isInteger(val), {
      message: "ID inválido",
    })
    .optional(),

  marca_id: z
    .union([z.string(), z.number(), z.null()])
    .transform((val) => (val === "" || val === null ? null : Number(val)))
    .refine((val) => val === null || Number.isInteger(val), {
      message: "ID inválido",
    })
    .optional(),

  proveedor_id: z
    .union([z.string(), z.number(), z.null()])
    .transform((val) => (val === "" || val === null ? null : Number(val)))
    .refine((val) => val === null || Number.isInteger(val), {
      message: "ID inválido",
    })
    .optional(),

  codigo_barra: z.string().max(50).optional().nullable(),
  unidad_medida: z.string().max(20).optional().nullable(),

  controla_stock: z
    .union([z.boolean(), z.string(), z.number()])
    .transform((val) => val === true || val === "1" || val === 1)
    .optional(),

  tiene_nro_serie: z
    .union([z.boolean(), z.string(), z.number()])
    .transform((val) => val === true || val === "1" || val === 1)
    .optional(),
});

export const updateArticuloSchema = articuloSchema
  .extend({
    activo: z.union([z.literal(1), z.literal(0)]).optional(),
  })
  .partial();
