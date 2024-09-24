import axiosFactory from "../configs/axiosConfig";

export async function fetchBrands() {
  const api = axiosFactory();
  try {
    return (await api.get("/brands")).data;
  } catch (error) {
    return { error };
  }
}

export async function updateBrand(brand) {
  const api = axiosFactory();
  const formData = new FormData();
  formData.append("id", brand.id);
  formData.append("name", brand.name);
  formData.append("description", brand.description);
  formData.append("image", brand.image);
  try {
    return (await api.put("/brands", formData)).data;
  } catch (error) {
    return { error };
  }
}

export async function createBrand(data) {
  const api = axiosFactory();
  try {
    return (
      await api.post("/brands", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  } catch (error) {
    return { error };
  }
}
