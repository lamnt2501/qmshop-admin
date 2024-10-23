import axiosFactory from "../configs/axiosConfig";

export async function fetchRatingsByProductId(id) {
  const api = axiosFactory();
  try {
    const res = (await api.get(`/ratings/product/${id}`)).data;
    console.log(res);
    return res;
  } catch (error) {
    return { error };
  }
}
