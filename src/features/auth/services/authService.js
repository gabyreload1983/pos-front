import api from "@/lib/axios";

export async function loginRequest(email, password) {
  const response = await api.post("/users/login", { email, password });
  return response.data; // se espera { token, usuario }
}
