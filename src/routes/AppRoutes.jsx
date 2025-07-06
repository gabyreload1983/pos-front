import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";
import mainAppRoutes from "./mainAppRoutes";

export default function AppRoutes() {
  const routes = [...authRoutes, mainAppRoutes];
  return useRoutes(routes);
}
