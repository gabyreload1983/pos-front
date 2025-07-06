import ProveedoresRoot from "@/features/proveedores/pages/ProveedoresRoot";
import ProveedoresLista from "@/features/proveedores/pages/ProveedoresLista";
import ProveedorNuevo from "@/features/proveedores/pages/ProveedorNuevo";
import ProveedorEditar from "@/features/proveedores/pages/ProveedorEditar";
import PrivateRoute from "./PrivateRoute";

const proveedorRoutes = {
  path: "/proveedores",
  element: (
    <PrivateRoute>
      <ProveedoresRoot />
    </PrivateRoute>
  ),
  children: [
    { path: "lista", element: <ProveedoresLista /> },
    { path: "agregar", element: <ProveedorNuevo /> },
    { path: "modificar/:id", element: <ProveedorEditar /> },
  ],
};

export default proveedorRoutes;
