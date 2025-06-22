import { useEffect, useState } from "react";
import { obtenerVentas } from "../services/ventasService";

export default function Ventas() {
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
      <h2 className="text-2xl font-bold mb-4">Ventas</h2>

      {loading && <p>Cargando ventas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-2">
          {ventas.map((venta) => (
            <li
              key={venta.id}
              className="p-2 bg-gray-100 rounded dark:bg-gray-800"
            >
              <p>
                <strong>ID:</strong> {venta.id}
              </p>
              <p>
                <strong>Total:</strong> ${venta.total}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
