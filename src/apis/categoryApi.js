import axiosFactory from "../configs/axiosConfig";

export async function fetchCategories() {
  const api = axiosFactory();
  try {
    return (await api.get("/categories")).data;
  } catch (error) {
    return { error };
  }
}

export async function categoryApi(method, url, data, config) {
  const api = axiosFactory();
  try {
    switch (method) {
      case "get":
        return await api.get(url, config);
      case "post":
        return await api.post(url, data, config);
    }
  } catch (error) {
    return { error };
  }
}
