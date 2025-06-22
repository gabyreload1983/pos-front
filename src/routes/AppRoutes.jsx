import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Ventas from "../pages/Ventas";
import MainLayout from "../layouts/MainLayout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "ventas", element: <Ventas /> },
    ],
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
