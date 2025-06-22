import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-4">
      <Link to="/" className="hover:underline">Inicio</Link>
      <Link to="/ventas" className="hover:underline">Ventas</Link>
    </nav>
  );
}
