import VentasRoot from "@/features/ventas/pages/VentasRoot";
import VentasLista from "@/features/ventas/pages/VentasLista";
import PrivateRoute from "./PrivateRoute";

const ventaRoutes = {
  path: "/ventas",
  element: (
    <PrivateRoute>
      <VentasRoot />
    </PrivateRoute>
  ),
  children: [{ path: "lista", element: <VentasLista /> }],
};

export default ventaRoutes;
