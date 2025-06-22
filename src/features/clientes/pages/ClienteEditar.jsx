import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  actualizarCliente,
  obtenerClientes,
} from "../services/clientesService";
import FormularioCliente from "../components/FormularioCliente";

export default function ClienteEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    obtenerClientes()
      .then((clientes) => {
        const encontrado = clientes.find((c) => c.id === parseInt(id));
        if (!encontrado) {
          alert("Cliente no encontrado");
          navigate("/clientes/lista");
        }
        setCliente(encontrado);
      })
      .catch(() => {
        alert("Error al cargar cliente");
        navigate("/clientes/lista");
      });
  }, [id, navigate]);

  const handleGuardar = async (data) => {
    try {
      await actualizarCliente(id, data);
      navigate("/clientes/lista");
    } catch (err) {
      alert("Error al modificar cliente");
    }
  };

  return cliente ? (
    <div className="max-w-4xl mx-auto">
      <FormularioCliente initialData={cliente} onSubmit={handleGuardar} />
    </div>
  ) : (
    <p className="text-center">Cargando cliente...</p>
  );
}
