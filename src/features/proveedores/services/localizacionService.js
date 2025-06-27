import api from "@/lib/axios";

export async function getProvincias() {
  const res = await api.get("/provincias");
  return res.data;
}

export async function getCiudadesPorProvincia(provincia_id) {
  const res = await api.get("/ciudades", { params: { provincia_id } });
  return res.data;
}
