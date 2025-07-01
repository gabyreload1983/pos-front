import { useEffect, useState } from "react";
import { clienteSchema } from "../schemas/clienteSchema";
import {
  getProvincias,
  getCiudadesPorProvincia,
  getCondicionesIva,
  getTiposDocumento,
} from "../../../service/datosGeneralesService";

export default function FormularioCliente({
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
  const [tiposDocumento, setTiposDocumento] = useState([]);

  const [submitFn, setSubmitFn] = useState(() => () => {});

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

  useEffect(() => {
    getTiposDocumento().then(setTiposDocumento);
  }, []);

  function getDefaultForm() {
    return {
      nombre: "",
      apellido: "",
      razon_social: "",
      tipo_documento_id: "",
      documento: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = clienteSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      submitFn(result.data); // <-- aquí
      if (!modoEdicion) setFormData(getDefaultForm());
    }
  };

  useEffect(() => {
    if (typeof onSubmit === "function") {
      const submitConErrores = async (data) => {
        try {
          await onSubmit(data);
        } catch (erroresDelBackend) {
          // Transformar formato [{campo, mensaje}] a { campo: [mensaje] }
          const fieldErrors = {};
          erroresDelBackend.forEach((e) => {
            fieldErrors[e.campo] = [e.mensaje];
          });
          setErrors(fieldErrors);
        }
      };
      setSubmitFn(() => submitConErrores);
    }
  }, [onSubmit]);

  const condicionConsumidorFinal = condicionesIva.find(
    (ci) => ci.nombre === "Consumidor Final"
  );
  const documentoCUIL = tiposDocumento.find((td) => td.nombre === "CUIL");
  const esConsumidorFinal =
    Number(formData.condicion_iva_id) === condicionConsumidorFinal?.id;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Datos del Cliente
      </h3>

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Tipo de Documento"
          name="tipo_documento_id"
          value={formData.tipo_documento_id}
          onChange={handleNumberChange}
          options={
            esConsumidorFinal
              ? tiposDocumento
                  .filter((d) => d.nombre === "DNI" || d.nombre === "CUIL")
                  .map((d) => ({ label: d.nombre, value: d.id }))
              : tiposDocumento
                  .filter((d) => d.nombre === "CUIT")
                  .map((d) => ({ label: d.nombre, value: d.id }))
          }
          error={errors.tipo_documento_id}
        />
        <Input
          label={
            esConsumidorFinal
              ? formData.tipo_documento_id === documentoCUIL?.id
                ? "Número de CUIL"
                : "Número de DNI"
              : "CUIT"
          }
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          error={errors.documento}
        />
        {esConsumidorFinal ? (
          <>
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
          </>
        ) : (
          <>
            <Input
              label="Razón Social"
              name="razon_social"
              value={formData.razon_social}
              onChange={handleChange}
              error={errors.razon_social}
            />
          </>
        )}

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
