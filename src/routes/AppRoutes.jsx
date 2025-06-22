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
    ],
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
