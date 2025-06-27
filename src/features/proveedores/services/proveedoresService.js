import api from "@/lib/axios";

export async function obtenerProveedores() {
  const res = await api.get("/proveedores");
  return res.data;
}

export async function crearProveedor(data) {
  const res = await api.post("/proveedores", data);
  return res.data;
}

export async function actualizarProveedor(id, data) {
  const res = await api.put(`/proveedores/${id}`, data);
  return res.data;
}
