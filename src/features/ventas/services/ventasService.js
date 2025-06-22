import api from "@/lib/axios";

export async function obtenerVentas() {
  const res = await api.get("/ventas"); // esto llama a tu backend con el token
  return res.data;
}
