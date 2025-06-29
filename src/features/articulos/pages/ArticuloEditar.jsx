import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  actualizarArticulo,
  obtenerArticulos,
} from "../services/articulosService";
import FormularioArticulo from "../components/FormularioArticulo";

export default function ArticuloEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState(null);

  useEffect(() => {
    obtenerArticulos()
      .then((articulos) => {
        const encontrado = articulos.find((c) => c.id === parseInt(id));
        if (!encontrado) {
          alert("Articulo no encontrado");
          navigate("/articulos/lista");
        }
        setArticulo(encontrado);
      })
      .catch(() => {
        alert("Error al cargar articulo");
        navigate("/articulos/lista");
      });
  }, [id, navigate]);

  const handleGuardar = async (data) => {
    try {
      await actualizarArticulo(articulo.id, data);
      navigate("/articulos/lista");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Error de validación"
      ) {
        // Devolvés el array de errores al formulario
        throw err.response.data.detalles;
      } else {
        alert("Error al actualizar articulo");
      }
    }
  };

  return articulo ? (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Editar Articulo
      </h2>
      <FormularioArticulo
        initialData={articulo}
        onSubmit={handleGuardar}
        modoEdicion
      />
    </div>
  ) : (
    <p className="text-center text-gray-800 dark:text-gray-100">
      Cargando articulo...
    </p>
  );
}
