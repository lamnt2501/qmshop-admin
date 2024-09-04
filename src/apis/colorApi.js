import axiosFactory from "../configs/axiosConfig";
import { VITE_PUBLIC_API_URL } from "../configs/envConfig";

export async function fetchColors() {
  const api = axiosFactory();
  try {
    return (await api.get(`${VITE_PUBLIC_API_URL}/colors`)).data;
  } catch (error) {
    return { error };
  }
}

export async function updateColor(color) {
  const api = axiosFactory();
  try {
    return (await api.put("/colors", color)).data;
  } catch (error) {
    return { error };
  }
}

export async function createcolor(color) {
  const api = axiosFactory();
  try {
    return (await api.post("/colors", color)).data;
  } catch (error) {
    return { error };
  }
}
