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
      await actualizarCliente(cliente.id, data);
      navigate("/clientes/lista");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Error de validación"
      ) {
        // Devolvés el array de errores al formulario
        throw err.response.data.detalles;
      } else {
        alert("Error al actualizar cliente");
      }
    }
  };

  return cliente ? (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Editar Cliente
      </h2>
      <FormularioCliente
        initialData={cliente}
        onSubmit={handleGuardar}
        modoEdicion
      />
    </div>
  ) : (
    <p className="text-center text-gray-800 dark:text-gray-100">
      Cargando cliente...
    </p>
  );
}
