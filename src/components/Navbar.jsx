import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 p-4 text-gray-800 shadow flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">
          Inicio
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/ventas" className="hover:text-blue-600">
              Ventas
            </Link>
            <Link to="/clientes" className="hover:text-blue-600">
              Clientes
            </Link>
          </>
        )}
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={logout} className="hover:underline text-sm">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
