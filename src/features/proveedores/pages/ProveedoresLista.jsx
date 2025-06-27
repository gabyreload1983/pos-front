import { useEffect, useState } from "react";
import { obtenerProveedores } from "../services/proveedoresService";
import { Link } from "react-router-dom";

export default function ProveedoresLista() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerProveedores()
      .then(setProveedores)
      .catch(() => alert("Error al obtener proveedores"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <p className="text-gray-800 dark:text-gray-100">
          Cargando proveedores...
        </p>
      ) : (
        proveedores.map((proveedor) => (
          <div
            key={proveedor.id}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {proveedor.nombre}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {proveedor.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {proveedor.telefono}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {proveedor.razon_social}
              </p>
            </div>
            <Link
              to={`/proveedores/modificar/${proveedor.id}`}
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
