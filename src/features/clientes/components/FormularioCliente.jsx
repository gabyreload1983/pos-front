import { useEffect, useState } from "react";
import { clienteSchema } from "../schemas/clienteSchema";
import {
  getProvincias,
  getCiudadesPorProvincia,
} from "../services/localizacionService";

export default function FormularioCliente({
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(getDefaultForm());
  const [errors, setErrors] = useState({});
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);

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

  function getDefaultForm() {
    return {
      nombre: "",
      apellido: "",
      razon_social: "",
      tipo_documento: "DNI",
      numero_documento: "",
      email: "",
      telefono: "",
      direccion: "",
      ciudad_id: "",
      provincia_id: "",
      pais: "Argentina",
      condicion_iva: "Consumidor Final",
      cuit: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = clienteSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      onSubmit(formData);
      setFormData(getDefaultForm());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800">Datos del Cliente</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
        />
        <Input
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          error={errors.apellido}
        />
        <Input
          label="Razón Social"
          name="razon_social"
          value={formData.razon_social}
          onChange={handleChange}
        />
        <Select
          label="Tipo Documento"
          name="tipo_documento"
          value={formData.tipo_documento}
          onChange={handleChange}
          options={[
            { value: "DNI", label: "DNI" },
            { value: "CUIT", label: "CUIT" },
            { value: "CUIL", label: "CUIL" },
            { value: "Pasaporte", label: "Pasaporte" },
          ]}
        />
        <Input
          label="Número Documento"
          name="numero_documento"
          value={formData.numero_documento}
          onChange={handleChange}
        />
        <Input
          label="CUIT"
          name="cuit"
          value={formData.cuit}
          onChange={handleChange}
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
        />
        <Input
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
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
        <Select
          label="Condición IVA"
          name="condicion_iva"
          value={formData.condicion_iva}
          onChange={handleChange}
          options={[
            { value: "Responsable Inscripto", label: "Responsable Inscripto" },
            { value: "Monotributo", label: "Monotributo" },
            { value: "Consumidor Final", label: "Consumidor Final" },
            { value: "Exento", label: "Exento" },
          ]}
        />
        <Input
          label="País"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error[0]}</p>}
    </div>
  );
}

function Select({ label, name, value, onChange, options, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
