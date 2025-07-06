import { Outlet, NavLink } from "react-router-dom";

export default function VentasRoot() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Ventas
      </h2>
      <nav className="mb-6 flex gap-4 border-b pb-2 border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400">
        <NavLink
          to="lista"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : ""
          }
        >
          Lista
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
