import ClientesRoot from "@/features/clientes/pages/ClientesRoot";
import ClientesLista from "@/features/clientes/pages/ClientesLista";
import ClienteNuevo from "@/features/clientes/pages/ClienteNuevo";
import ClienteEditar from "@/features/clientes/pages/ClienteEditar";
import PrivateRoute from "./PrivateRoute";

const clienteRoutes = {
  path: "/clientes",
  element: (
    <PrivateRoute>
      <ClientesRoot />
    </PrivateRoute>
  ),
  children: [
    { path: "lista", element: <ClientesLista /> },
    { path: "agregar", element: <ClienteNuevo /> },
    { path: "modificar/:id", element: <ClienteEditar /> },
  ],
};

export default clienteRoutes;
