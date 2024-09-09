import axiosFactory from "../configs/axiosConfig";

export async function fetchOrders(params) {
  const api = axiosFactory();
  try {
    return (await api.get(`/orders${params ? "?" + params : ""}`)).data;
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
  const api = axiosFactory();
  try {
    return (await api.get(`/orders/${id}`)).data;
  } catch (error) {
    return { error };
  }
}

export async function fetchOrderByCustomerId(id) {
  const api = axiosFactory();
  try {
    return (await api.get(`/orders/customer/${id}`)).data;
  } catch (error) {
    return { error };
  }
}
