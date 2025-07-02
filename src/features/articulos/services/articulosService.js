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

export async function getMarcas() {
  const res = await api.get("/marcas");
  return res.data;
}

export async function getCategorias() {
  const res = await api.get("/categorias");
  return res.data;
}

export async function getMonedas() {
  const res = await api.get("/monedas");
  return res.data;
}

export async function getIvaAliquotas() {
  const res = await api.get("/iva-aliquotas");
  return res.data;
}

export async function getProveedores() {
  const res = await api.get("/proveedores");
  return res.data;
}
