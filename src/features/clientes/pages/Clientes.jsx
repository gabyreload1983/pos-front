import { useEffect, useState } from "react";
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
} from "../services/clientesService";
import FormularioCliente from "../components/FormularioCliente";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);

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

  const handleGuardar = async (formData) => {
    try {
      if (editando) {
        await actualizarCliente(editando.id, formData);
      } else {
        await crearCliente(formData);
      }
      setEditando(null);
      setMostrandoFormulario(false);
      cargarClientes();
    } catch (err) {
      alert("Error al guardar cliente");
    }
  };

  const iniciarEdicion = (cliente) => {
    setEditando(cliente);
    setMostrandoFormulario(true);
  };

  const iniciarCreacion = () => {
    setEditando(null);
    setMostrandoFormulario(true);
  };

  const cancelarFormulario = () => {
    setEditando(null);
    setMostrandoFormulario(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>

      {!mostrandoFormulario && (
        <button
          onClick={iniciarCreacion}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Crear nuevo cliente
        </button>
      )}

      {mostrandoFormulario && (
        <FormularioCliente
          initialData={editando}
          onSubmit={handleGuardar}
          onCancel={cancelarFormulario}
        />
      )}

      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <ul className="space-y-2 mt-6">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="bg-gray-100 p-2 rounded dark:bg-gray-800 flex justify-between items-center"
            >
              <div>
                <strong>
                  {cliente.nombre} {cliente.apellido}
                </strong>
                <br />
                <span className="text-sm text-gray-600">{cliente.email}</span>
              </div>
              <button
                onClick={() => iniciarEdicion(cliente)}
                className="text-sm text-blue-600 hover:underline"
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
