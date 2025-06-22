import api from "@/lib/axios";

export async function obtenerClientes() {
  const res = await api.get("/clientes");
  return res.data;
}

export async function crearCliente(data) {
  const res = await api.post("/clientes", data);
  return res.data;
}

export async function actualizarCliente(id, data) {
  const res = await api.put(`/clientes/${id}`, data);
  return res.data;
}
