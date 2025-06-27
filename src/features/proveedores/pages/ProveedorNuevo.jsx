import { crearProveedor } from "../services/proveedoresService";
import FormularioProveedores from "../components/FormularioProveedores";
import { useNavigate } from "react-router-dom";

export default function ProveedorNuevo() {
  const navigate = useNavigate();

  const handleCrear = async (data) => {
    try {
      await crearProveedor(data);
      navigate("/proveedores/lista");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Error de validación"
      ) {
        // Pasar errores al formulario
        throw err.response.data.detalles;
      } else {
        alert("Error al crear proveedor");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Agregar Proveedor
      </h2>
      <FormularioProveedores onSubmit={handleCrear} />
    </div>
  );
}
