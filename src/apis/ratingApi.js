import axiosFactory from "../configs/axiosConfig";

export async function fetchRatingsByProductId(id) {
  const api = axiosFactory();
  try {
    await api.get(`/ratings/product/${id}`);
  } catch (error) {
    return { error };
  }
}
