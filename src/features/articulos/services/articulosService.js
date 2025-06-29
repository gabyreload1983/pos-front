import api from "@/lib/axios";

export async function obtenerArticulos() {
  const res = await api.get("/articulos");
  return res.data;
}

export async function crearArticulo(data) {
  const res = await api.post("/articulos", data);
  return res.data;
}

export async function actualizarArticulo(id, data) {
  const res = await api.put(`/articulos/${id}`, data);
  return res.data;
}
