import axiosFactory from "../configs/axiosConfig";

async function getDashBoardData() {
  const api = axiosFactory();

  try {
    const orderSummary = (await api.get(`/orders/summary`)).data;

    const paymentStatistic = (await api.get(`/payments/gateway-statistic`))
      .data;

    const bestProducts = (await api.get(`/orders/product-best-seller`)).data;

    const topCustomer = (await api.get(`/orders/top-customer`)).data;

    const revenue = (
      await api.post(`/payments/revenue`, {
        type: "year",
        year: new Date().getFullYear(),
      })
    ).data;

    return {
      orderSummary,
      paymentStatistic,
      bestProducts,
      topCustomer,
      revenue,
    };
  } catch (err) {
    return { error: err };
  }
}

async function fetchOrderSummary() {
  const api = axiosFactory();

  try {
    const orderSummary = (await api.get(`/orders/summary`)).data;
    return orderSummary;
  } catch (error) {
    return { error };
  }
}

export { getDashBoardData, fetchOrderSummary };
