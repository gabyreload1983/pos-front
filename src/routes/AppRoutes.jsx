import { useRoutes } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/features/auth/pages/Login";
import Ventas from "@/features/ventas/pages/Ventas";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import ClientesRoot from "@/features/clientes/pages/ClientesRoot";
import ClientesLista from "@/features/clientes/pages/ClientesLista";
import ClienteNuevo from "@/features/clientes/pages/ClienteNuevo";
import ClienteEditar from "@/features/clientes/pages/ClienteEditar";
import ProveedoresRoot from "@/features/proveedores/pages/ProveedoresRoot";
import ProveedoresLista from "@/features/proveedores/pages/ProveedoresLista";
import ProveedorNuevo from "@/features/proveedores/pages/ProveedorNuevo";
import ProveedorEditar from "@/features/proveedores/pages/ProveedorEditar";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "ventas", element: <Ventas /> },
      {
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
      },
      {
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
      },
    ],
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
