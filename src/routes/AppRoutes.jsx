import { useRoutes } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/features/auth/pages/Login";
import Ventas from "@/features/ventas/pages/Ventas";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

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
    ],
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
