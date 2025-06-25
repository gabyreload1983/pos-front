import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
