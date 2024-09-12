import axiosFactory from "../configs/axiosConfig";

export async function fetchDiscounts() {
  const api = axiosFactory();
  try {
    return (await api.get("/discounts")).data;
  } catch (error) {
    return { error };
  }
}

export async function createDiscount(data) {
  const api = axiosFactory();
  try {
    return (await api.post("/discounts", data)).data;
  } catch (error) {
    return { error };
  }
}
