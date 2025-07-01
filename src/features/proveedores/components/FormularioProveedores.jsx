import { useEffect, useState } from "react";
import { ProveedorSchema } from "../schemas/proveedorSchema";
import {
  getProvincias,
  getCiudadesPorProvincia,
  getCondicionesIva,
} from "../../../service/datosGeneralesService";

export default function FormularioProveedores({
  initialData = {},
  onSubmit,
  onCancel,
  modoEdicion = false,
}) {
  const [formData, setFormData] = useState(getDefaultForm());
  const [errors, setErrors] = useState({});
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [condicionesIva, setCondicionesIva] = useState([]);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [JSON.stringify(initialData)]);

  useEffect(() => {
    getProvincias().then(setProvincias);
  }, []);

  useEffect(() => {
    if (formData.provincia_id) {
      getCiudadesPorProvincia(formData.provincia_id).then(setCiudades);
    }
  }, [formData.provincia_id]);

  useEffect(() => {
    getCondicionesIva().then(setCondicionesIva);
  }, []);

  function getDefaultForm() {
    return {
      nombre: "",
      razon_social: "",
      cuit: "",
      email: "",
      telefono: "",
      direccion: "",
      ciudad_id: "",
      provincia_id: "",
      condicion_iva_id: "",
    };
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = ProveedorSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    try {
      await onSubmit(result.data); // ← llamada real
      if (!modoEdicion) setFormData(getDefaultForm());
    } catch (erroresDelBackend) {
      // Transformar errores del backend a { campo: [mensaje] }
      const fieldErrors = {};
      if (Array.isArray(erroresDelBackend)) {
        erroresDelBackend.forEach((e) => {
          fieldErrors[e.campo] = [e.mensaje];
        });
      }
      setErrors(fieldErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Datos del Proveedor
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
        />
        <Input
          label="Razón Social"
          name="razon_social"
          value={formData.razon_social}
          onChange={handleChange}
          error={errors.razon_social}
        />
        <Select
          label="Condición IVA"
          name="condicion_iva_id"
          value={formData.condicion_iva_id}
          onChange={handleChange}
          options={condicionesIva.map((ci) => ({
            label: ci.nombre,
            value: ci.id,
          }))}
          error={errors.condicion_iva_id}
        />
        <Input
          label="CUIT"
          name="cuit"
          value={formData.cuit}
          onChange={handleChange}
          error={errors.cuit}
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          error={errors.telefono}
        />
        <Input
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          error={errors.direccion}
        />
        <Select
          label="Provincia"
          name="provincia_id"
          value={formData.provincia_id}
          onChange={handleNumberChange}
          options={provincias.map((p) => ({ label: p.nombre, value: p.id }))}
          error={errors.provincia_id}
        />
        <Select
          label="Ciudad"
          name="ciudad_id"
          value={formData.ciudad_id}
          onChange={handleNumberChange}
          options={ciudades.map((c) => ({ label: c.nombre, value: c.id }))}
          error={errors.ciudad_id}
        />

        {modoEdicion && (
          <Select
            label="Estado"
            name="activo"
            value={formData.activo}
            onChange={handleNumberChange}
            options={[
              { value: 1, label: "Activado" },
              { value: 0, label: "Inactivo" },
            ]}
            error={errors.activo}
          />
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

function Input({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error[0]}</p>}
    </div>
  );
}

function Select({ label, name, value, onChange, options, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccionar...</option>
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error[0]}</p>}
    </div>
  );
}
