import axiosFactory from "../configs/axiosConfig";

export async function fetchOrders(params) {
  const api = axiosFactory();
  try {
    return (await api.get("/orders")).data;
  } catch (error) {
    return { error };
  }
}

export async function updateOrderStatus(id, status, message) {
  try {
    const api = axiosFactory();
    return (
      await api.patch("/orders", {
        id,
        status,
        message,
      })
    ).data;
  } catch (error) {
    return { error };
  }
}

export async function fetchOrder(id) {
  try {
    const api = axiosFactory();
    return (await api.get(`/orders/${id}`)).data;
  } catch (error) {
    return { error };
  }
}
