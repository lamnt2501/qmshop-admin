import axiosFactory from "../configs/axiosConfig";

export async function fetchProducts(params) {
  const api = axiosFactory();
  try {
    return (await api.get(`/products${params ? "?" + params : ""}`)).data;
  } catch (error) {
    return { error };
  }
}

export async function fetchProductyId(id) {
  const api = axiosFactory();
  try {
    return (await api.get(`/products/${id}`)).data;
  } catch (error) {
    return { error };
  }
}

export async function updateProductById(id, data) {
  const api = axiosFactory();
  try {
    return (await api.patch(`/products/${id}`, data)).data;
  } catch (error) {
    return { error };
  }
}

export async function activeProductById(id, active) {
  const api = axiosFactory();
  const data = new FormData();
  data.append("active", active);
  try {
    return (await api.patch(`/products/a/${id}`, data)).data;
  } catch (error) {
    return { error };
  }
}

export async function createProduct(product) {
  const api = axiosFactory();
  try {
    return (await api.post("/products", product)).data;
  } catch (error) {
    return { error };
  }
}
