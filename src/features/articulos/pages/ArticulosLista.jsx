import { useEffect, useState } from "react";
import { obtenerArticulos } from "../services/articulosService";
import { Link } from "react-router-dom";

export default function ArticulosLista() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerArticulos()
      .then(setArticulos)
      .catch(() => alert("Error al obtener articulos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <p className="text-gray-800 dark:text-gray-100">
          Cargando articulos...
        </p>
      ) : (
        articulos.map((articulo) => (
          <div
            key={articulo.id}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {articulo.nombre}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {articulo.descripcion}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {articulo.precio_venta}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {articulo.codigo_barra}
              </p>
            </div>
            <Link
              to={`/articulos/modificar/${articulo.id}`}
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
