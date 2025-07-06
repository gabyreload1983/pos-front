import { useEffect, useState } from "react";
import { obtenerVentas } from "../services/ventasService";

export default function VentasLista() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerVentas()
      .then(setVentas)
      .catch(() => setError("No se pudieron cargar las ventas"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Cargando ventas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventas.map((venta) => (
            <div
              key={venta.id}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Venta #{venta.id}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  <strong>Total:</strong> ${venta.total}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  <strong>Fecha:</strong>{" "}
                  {new Date(venta.fecha).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  <strong>Pago:</strong> {venta.tipo_pago}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
