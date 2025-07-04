import api from "@/lib/axios";

export async function getProvincias() {
  const res = await api.get("/provincias");
  return res.data;
}

export async function getCiudadesPorProvincia(provincia_id) {
  const res = await api.get("/ciudades", { params: { provincia_id } });
  return res.data;
}

export async function getCondicionesIva() {
  const res = await api.get("/condiciones-iva");
  return res.data;
}

export async function getTiposDocumento() {
  const res = await api.get("/tipos-documento");
  return res.data;
}
