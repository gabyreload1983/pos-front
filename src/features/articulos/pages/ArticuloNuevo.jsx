import { crearArticulo } from "../services/articulosService";
import FormularioArticulo from "../components/FormularioArticulo";
import { useNavigate } from "react-router-dom";

export default function ArticuloNuevo() {
  const navigate = useNavigate();

  const handleCrear = async (data) => {
    try {
      await crearArticulo(data);
      navigate("/articulos/lista");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Error de validación"
      ) {
        // Pasar errores al formulario
        throw err.response.data.detalles;
      } else {
        alert("Error al crear articulo");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Agregar Articulo
      </h2>
      <FormularioArticulo onSubmit={handleCrear} />
    </div>
  );
}
