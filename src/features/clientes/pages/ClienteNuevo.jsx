import { crearCliente } from "../services/clientesService";
import FormularioCliente from "../components/FormularioCliente";
import { useNavigate } from "react-router-dom";

export default function ClienteNuevo() {
  const navigate = useNavigate();

  const handleCrear = async (data) => {
    try {
      await crearCliente(data);
      navigate("/clientes/lista");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Error de validación"
      ) {
        // Pasar errores al formulario
        throw err.response.data.detalles;
      } else {
        alert("Error al crear cliente");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FormularioCliente onSubmit={handleCrear} />
    </div>
  );
}
