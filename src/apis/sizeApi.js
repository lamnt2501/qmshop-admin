import axiosFactory from "../configs/axiosConfig";
import { VITE_PUBLIC_API_URL } from "../configs/envConfig";

export async function fetchSizes() {
  const api = axiosFactory();
  try {
    return (await api.get(`${VITE_PUBLIC_API_URL}/sizes`)).data;
  } catch (error) {
    return { error };
  }
}

export async function updateSize(id, size, description) {
  const api = axiosFactory();
  try {
    return (
      await api.put(`/sizes`, {
        id,
        size,
        description,
      })
    ).data;
  } catch (error) {
    return { error };
  }
}

export async function createSize(size, description) {
  const api = axiosFactory();
  try {
    return (await api.post("/sizes", { size, description })).data;
  } catch (error) {
    return { error };
  }
}
