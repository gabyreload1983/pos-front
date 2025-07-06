import Home from "@/pages/Home";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute"; // sigue siendo el componente

import clienteRoutes from "./clienteRoutes";
import proveedorRoutes from "./proveedorRoutes";
import articuloRoutes from "./articuloRoutes";
import ventaRoutes from "./ventaRoutes";

const mainAppRoutes = {
  path: "/",
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <Home /> },
    ventaRoutes,
    clienteRoutes,
    proveedorRoutes,
    articuloRoutes,
  ],
};

export default mainAppRoutes;
