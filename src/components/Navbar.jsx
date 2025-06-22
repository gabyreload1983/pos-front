import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-4 justify-between">
      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        {isAuthenticated && <Link to="/ventas">Ventas</Link>}
        {isAuthenticated && <Link to="/clientes">Clientes</Link>}
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={logout} className="hover:underline">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
