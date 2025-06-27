import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  actualizarProveedor,
  obtenerProveedores,
} from "../services/proveedoresService";
import FormularioProveedores from "../components/FormularioProveedores";

export default function ProveedorEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState(null);

  useEffect(() => {
    obtenerProveedores()
      .then((proveedores) => {
        const encontrado = proveedores.find((c) => c.id === parseInt(id));
        if (!encontrado) {
          alert("Proveedor no encontrado");
          navigate("/proveedores/lista");
        }
        setProveedor(encontrado);
      })
      .catch(() => {
        alert("Error al cargar proveedor");
        navigate("/proveedores/lista");
      });
  }, [id, navigate]);

  const handleGuardar = async (data) => {
    try {
      await actualizarProveedor(proveedor.id, data);
      navigate("/proveedores/lista");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Error de validación"
      ) {
        // Devolvés el array de errores al formulario
        throw err.response.data.detalles;
      } else {
        alert("Error al actualizar proveedor");
      }
    }
  };

  return proveedor ? (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Editar Proveedor
      </h2>
      <FormularioProveedores
        initialData={proveedor}
        onSubmit={handleGuardar}
        modoEdicion
      />
    </div>
  ) : (
    <p className="text-center text-gray-800 dark:text-gray-100">
      Cargando proveedor...
    </p>
  );
}
