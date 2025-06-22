import { Outlet, NavLink } from "react-router-dom";

export default function ClientesRoot() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Clientes</h2>
      <nav className="mb-6 flex gap-4 border-b pb-2 text-blue-600">
        <NavLink
          to="lista"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : ""
          }
        >
          Lista
        </NavLink>
        <NavLink
          to="agregar"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : ""
          }
        >
          Agregar
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
