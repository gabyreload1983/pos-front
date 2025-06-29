import { useEffect, useState } from "react";
import { articuloSchema } from "../schemas/articuloSchema";
import { getCategorias, getMarcas } from "../services/articulosService";

export default function FormularioArticulo({
  initialData = {},
  onSubmit,
  onCancel,
  modoEdicion = false,
}) {
  const [formData, setFormData] = useState(getDefaultForm());
  const [errors, setErrors] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [submitFn, setSubmitFn] = useState(() => () => {});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [JSON.stringify(initialData)]);

  useEffect(() => {
    getMarcas(formData.marca_id).then(setMarcas);
  }, [formData.marca_id]);

  useEffect(() => {
    getCategorias(formData.categoria_id).then(setCategorias);
  }, [formData.categoria_id]);

  function getDefaultForm() {
    return {
      nombre: "",
      descripcion: "",
      costo: 0,
      renta: 0,
      precio_venta: 0,
      iva_id: 1,
      moneda_id: 1,
      categoria_id: null,
      marca_id: null,
      proveedor_id: null,
      codigo_barra: "",
      unidad_medida: "",
      controla_stock: null,
      activo: modoEdicion ? 1 : 0,
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
    const result = articuloSchema.safeParse(formData);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Datos del Articulo
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
          label="Descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          error={errors.descripcion}
        />
        <Input
          label="costo"
          name="costo"
          type="number"
          value={formData.costo}
          onChange={handleChange}
          error={errors.costo}
        />
        <Input
          label="Renta"
          name="renta"
          type="number"
          value={formData.renta}
          onChange={handleChange}
          error={errors.renta}
        />
        <Input
          label="Precio Venta"
          name="precio_venta"
          type="number"
          value={formData.precio_venta}
          onChange={handleChange}
          error={errors.precio_venta}
        />
        <Select
          label="Iva"
          name="iva_id"
          value={formData.iva_id}
          onChange={handleChange}
          options={[
            { value: "10.5", label: "10.5%" },
            { value: "21", label: "21%" },
            { value: "27", label: "27%" },
          ]}
          error={errors.iva_id}
        />
        <Select
          label="Moneda"
          name="moneda_id"
          value={formData.moneda_id}
          onChange={handleChange}
          options={[
            { value: "1", label: "ARS" },
            { value: "2", label: "USD" },
            { value: "3", label: "EUR" },
          ]}
          error={errors.moneda_id}
        />
        <Select
          label="Marcas"
          name="marca_id"
          value={formData.marca_id}
          onChange={handleNumberChange}
          options={marcas.map((m) => ({ label: m.nombre, value: m.id }))}
          error={errors.marca_id}
        />
        <Select
          label="Categorias"
          name="categoria_id"
          value={formData.categoria_id}
          onChange={handleChange}
          options={categorias.map((c) => ({ label: c.nombre, value: c.id }))}
          error={errors.categoria_id}
        />
        <Select
          label="Proveedor"
          name="proveedor_id"
          value={formData.proveedor_id}
          onChange={handleChange}
          options={[
            { value: "1", label: "Proveedor1" },
            { value: "2", label: "Proveedor2" },
            { value: "3", label: "Proveedor3" },
            { value: "4", label: "Proveedor4" },
            { value: "5", label: "Proveedor5" },
          ]}
          error={errors.proveedor_id}
        />
        <Input
          label="Codigo de Barra"
          name="codigo_barra"
          value={formData.codigo_barra}
          onChange={handleChange}
          error={errors.codigo_barra}
        />
        <Input
          label="Unidad de medida"
          name="unidad_medida"
          value={formData.unidad_medida}
          onChange={handleChange}
          error={errors.unidad_medida}
        />
        <Input
          label="Control Stock"
          name="controla_stock"
          value={formData.controla_stock}
          onChange={handleChange}
          error={errors.controla_stock}
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
