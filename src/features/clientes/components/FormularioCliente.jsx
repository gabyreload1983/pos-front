import { useState, useEffect } from "react";
import { clienteSchema } from "../schemas/clienteSchema";
import { z } from "zod";

export default function FormularioCliente({
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    razon_social: "",
    tipo_documento: "DNI",
    numero_documento: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad_id: 1,
    provincia_id: 20,
    pais: "Argentina",
    condicion_iva: "Consumidor Final",
    cuit: "",
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = clienteSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl bg-white dark:bg-gray-800 p-4 rounded"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Nombre</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre[0]}</p>
          )}
        </div>
        <div>
          <label>Apellido</label>
          <input
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Razon Social</label>
          <input
            name="razon_social"
            value={formData.razon_social}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Tipo Documento</label>
          <select
            name="tipo_documento"
            value={formData.tipo_documento}
            onChange={handleChange}
            className="input"
          >
            <option>DNI</option>
            <option>CUIT</option>
            <option>CUIL</option>
            <option>Pasaporte</option>
          </select>
        </div>
        <div>
          <label>Número Documento</label>
          <input
            name="numero_documento"
            value={formData.numero_documento}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>CUIT</label>
          <input
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email[0]}</p>
          )}
        </div>
        <div>
          <label>Teléfono</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Dirección</label>
          <input
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Ciudad ID</label>
          <input
            type="number"
            name="ciudad_id"
            value={formData.ciudad_id}
            onChange={handleNumberChange}
            className="input"
          />
          {errors.ciudad_id && (
            <p className="text-red-500 text-sm">{errors.ciudad_id[0]}</p>
          )}
        </div>
        <div>
          <label>Provincia ID</label>
          <input
            type="number"
            name="provincia_id"
            value={formData.provincia_id}
            onChange={handleNumberChange}
            className="input"
          />
          {errors.provincia_id && (
            <p className="text-red-500 text-sm">{errors.provincia_id[0]}</p>
          )}
        </div>
        <div>
          <label>Condición IVA</label>
          <select
            name="condicion_iva"
            value={formData.condicion_iva}
            onChange={handleChange}
            className="input"
          >
            <option>Responsable Inscripto</option>
            <option>Monotributo</option>
            <option>Consumidor Final</option>
            <option>Exento</option>
          </select>
        </div>
        <div>
          <label>País</label>
          <input
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
