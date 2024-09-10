import axiosFactory from "../configs/axiosConfig";

export async function fetchRatingsByProductId(id) {
  const api = axiosFactory();
  try {
    return (await api.get(`/ratings/product/${id}`)).data;
  } catch (error) {
    return { error };
  }
}
