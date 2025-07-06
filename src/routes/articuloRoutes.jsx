import ArticulosRoot from "@/features/articulos/pages/ArticulosRoot";
import ArticulosLista from "@/features/articulos/pages/ArticulosLista";
import ArticuloNuevo from "@/features/articulos/pages/ArticuloNuevo";
import ArticuloEditar from "@/features/articulos/pages/ArticuloEditar";
import PrivateRoute from "./PrivateRoute";

const articuloRoutes = {
  path: "/articulos",
  element: (
    <PrivateRoute>
      <ArticulosRoot />
    </PrivateRoute>
  ),
  children: [
    { path: "lista", element: <ArticulosLista /> },
    { path: "agregar", element: <ArticuloNuevo /> },
    { path: "modificar/:id", element: <ArticuloEditar /> },
  ],
};

export default articuloRoutes;
