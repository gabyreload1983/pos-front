import { z } from "zod";

export const clienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().optional(),
  razon_social: z.string().optional(),
  tipo_documento: z.enum(["DNI", "CUIT", "CUIL", "Pasaporte"]).default("DNI"),
  numero_documento: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  ciudad_id: z.number({ invalid_type_error: "Debe seleccionar una ciudad" }),
  provincia_id: z.number({
    invalid_type_error: "Debe seleccionar una provincia",
  }),
  pais: z.string().default("Argentina"),
  condicion_iva: z
    .enum([
      "Responsable Inscripto",
      "Monotributo",
      "Consumidor Final",
      "Exento",
    ])
    .default("Consumidor Final"),
  cuit: z.string().optional(),
});
