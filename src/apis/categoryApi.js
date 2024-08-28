import axiosFactory from "../configs/axiosConfig";

export async function fetchCategories() {
  const api = axiosFactory();
  try {
    return (await api.get("/categories")).data;
  } catch (error) {
    return { error };
  }
}
