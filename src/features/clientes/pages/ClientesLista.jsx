import { useEffect, useState } from "react";
import { obtenerClientes } from "../services/clientesService";
import { Link } from "react-router-dom";

export default function ClientesLista() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerClientes()
      .then(setClientes)
      .catch(() => alert("Error al obtener clientes"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <p className="text-gray-800 dark:text-gray-100">Cargando clientes...</p>
      ) : (
        clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {cliente.nombre} {cliente.apellido}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {cliente.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {cliente.telefono}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {cliente.razon_social}
              </p>
            </div>
            <Link
              to={`/clientes/modificar/${cliente.id}`}
              className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm self-end"
            >
              Modificar
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
