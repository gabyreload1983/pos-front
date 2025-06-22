import { useEffect, useState } from "react";
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
} from "../services/clientesService";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", apellido: "" });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    setLoading(true);
    obtenerClientes()
      .then(setClientes)
      .catch(() => alert("Error al obtener clientes"))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarCliente(editando.id, formData);
      } else {
        await crearCliente(formData);
      }
      setFormData({ nombre: "", apellido: "" });
      setEditando(null);
      cargarClientes();
    } catch (err) {
      alert("Error al guardar cliente");
    }
  };

  const iniciarEdicion = (cliente) => {
    setFormData({ nombre: cliente.nombre, apellido: cliente.apellido || "" });
    setEditando(cliente);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editando ? "Guardar cambios" : "Crear cliente"}
        </button>
      </form>

      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <ul className="space-y-2">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="bg-gray-100 p-2 rounded dark:bg-gray-800"
            >
              {cliente.nombre} {cliente.apellido}
              <button
                onClick={() => iniciarEdicion(cliente)}
                className="ml-4 text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
