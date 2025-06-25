import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 text-gray-800 dark:text-gray-100 shadow flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Inicio
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/ventas"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Ventas
            </Link>
            <Link
              to="/clientes"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Clientes
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-sm border px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
              {user?.imagenUrl ? (
                <img
                  src={user.imagenUrl}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.nombre?.charAt(0).toUpperCase() || "👤"
              )}
            </div>
            <span className="text-sm font-medium">{user?.nombre}</span>
            <button onClick={logout} className="hover:underline text-sm ml-2">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
