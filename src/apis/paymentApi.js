import axiosFactory from "../configs/axiosConfig";

export async function updatePaymentStatus(id, status) {
  const api = axiosFactory();
  try {
    const res = (await api.patch("/payments", { id, status })).data;
    return res;
  } catch (error) {
    return { error };
  }
}
