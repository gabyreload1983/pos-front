import { useEffect, useState } from "react";
import { articuloSchema } from "../schemas/articuloSchema";
import {
  getCategorias,
  getIvaAliquotas,
  getMarcas,
  getMonedas,
} from "../services/articulosService";

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
  const [monedas, setMonedas] = useState([]);
  const [aliquotasIva, setIliquotasIva] = useState([]);

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

  useEffect(() => {
    getMonedas(formData.moneda_id).then(setMonedas);
  }, [formData.moneda_id]);

  useEffect(() => {
    getIvaAliquotas(formData.iva_aliquota_id).then(setIliquotasIva);
  }, [formData.iva_aliquota_id]);

  const aliquotaSeleccionada = aliquotasIva.find(
    (a) => Number(a.id) === Number(formData.iva_aliquota_id)
  );
  const porcentajeIva = aliquotaSeleccionada?.porcentaje || 0;

  const precioVenta = calcularPrecioVenta(
    Number(formData.costo),
    Number(formData.renta)
  );
  const precioFinal = calcularPrecioFinal(precioVenta, porcentajeIva);

  function getDefaultForm() {
    return {
      nombre: "",
      descripcion: "",
      costo: 0,
      renta: 0,
      iva_aliquota_id: null,
      moneda_id: null,
      categoria_id: null,
      marca_id: null,
      proveedor_id: null,
      codigo_barra: "",
      unidad_medida: "",
      controla_stock: false,
      tiene_nro_serie: false,
      activo: 1,
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
    const result = articuloSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    try {
      await onSubmit(result.data);
      setErrors({});
      if (!modoEdicion) setFormData(getDefaultForm());
    } catch (erroresDelBackend) {
      const fieldErrors = {};
      erroresDelBackend.forEach((e) => {
        fieldErrors[e.campo] = [e.mensaje];
      });
      setErrors(fieldErrors);
    }
  };

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
        <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Precio de Venta
          </h4>
          <div className="flex justify-between text-base text-gray-800 dark:text-gray-100">
            <span>Precio sin IVA:</span>
            <span>${precioVenta.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base text-gray-800 dark:text-gray-100 mt-1">
            <span>Precio final (con {porcentajeIva}% IVA):</span>
            <span>${precioFinal.toFixed(2)}</span>
          </div>
        </div>

        <Select
          label="Condicion IVA"
          name="iva_aliquota_id"
          value={formData.iva_aliquota_id}
          onChange={handleChange}
          options={aliquotasIva.map((i) => ({
            label: i.descripcion,
            value: i.id,
          }))}
          error={errors.iva_aliquota_id}
        />
        <Select
          label="Moneda"
          name="moneda_id"
          value={formData.moneda_id}
          onChange={handleChange}
          options={monedas.map((m) => ({ label: m.nombre, value: m.id }))}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ¿Tiene número de serie?
          </label>
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              role="switch"
              aria-checked={formData.tiene_nro_serie}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  tiene_nro_serie: !prev.tiene_nro_serie,
                  controla_stock: !prev.tiene_nro_serie
                    ? true
                    : prev.controla_stock,
                }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.tiene_nro_serie ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.tiene_nro_serie ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {formData.tiene_nro_serie ? "Sí" : "No"}
            </span>
          </div>
          {errors.tiene_nro_serie && (
            <p className="text-sm text-red-600 mt-1">
              {errors.tiene_nro_serie}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ¿Controla stock?
          </label>
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              role="switch"
              aria-checked={formData.controla_stock}
              disabled={formData.tiene_nro_serie}
              onClick={() =>
                !formData.tiene_nro_serie &&
                setFormData((prev) => ({
                  ...prev,
                  controla_stock: !prev.controla_stock,
                }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.controla_stock ? "bg-blue-600" : "bg-gray-300"
              } ${
                formData.tiene_nro_serie ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.controla_stock ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {formData.controla_stock ? "Sí" : "No"}
            </span>
          </div>
          {errors.controla_stock && (
            <p className="text-sm text-red-600 mt-1">{errors.controla_stock}</p>
          )}
          {formData.tiene_nro_serie && (
            <p className="text-xs text-gray-500 mt-1 italic">
              Obligatorio si el artículo tiene número de serie
            </p>
          )}
        </div>
        <Input
          label="Unidad de medida"
          name="unidad_medida"
          value={formData.unidad_medida}
          onChange={handleChange}
          error={errors.unidad_medida}
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

function calcularPrecioVenta(costo, renta) {
  const base = costo + (costo * renta) / 100;
  return parseFloat(base.toFixed(2));
}

function calcularPrecioFinal(precioVenta, aliquota) {
  if (!aliquota) return precioVenta;
  return parseFloat((precioVenta * (1 + aliquota / 100)).toFixed(2));
}
