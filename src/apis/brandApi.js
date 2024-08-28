import axiosFactory from "../configs/axiosConfig";

export async function fetchBrands() {
  const api = axiosFactory();
  try {
    return (await api.get("/brands")).data;
  } catch (error) {
    return { error };
  }
}
