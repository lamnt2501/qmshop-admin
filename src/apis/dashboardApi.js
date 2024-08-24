import axios from "axios";
import Cookies from "js-cookie";
import { VITE_MANAGEMENT_API_URL } from "../configs/envConfig";

async function getDashBoardData() {
  const token = Cookies.get("accessToken");

  const api = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const orderSummary = (
      await api.get(`${VITE_MANAGEMENT_API_URL}/orders/summary`)
    ).data;

    const paymentStatistic = (
      await api.get(`${VITE_MANAGEMENT_API_URL}/payments/gateway-statistic`)
    ).data;

    const bestProducts = (
      await api.get(`${VITE_MANAGEMENT_API_URL}/orders/product-best-seller`)
    ).data;

    const topCustomer = (
      await api.get(`${VITE_MANAGEMENT_API_URL}/orders/top-customer`)
    ).data;

    const revenue = (
      await api.post(`${VITE_MANAGEMENT_API_URL}/payments/revenue`, {
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

async function fetchBestProduct(time) {
  try {
    const data = (await axios.get(`http://localhost:80/api/v1/products`)).data;
    console.log(data);
    return data;
  } catch (err) {
    return { error: err };
  }
}

async function fetchRevenue(time) {}

export { fetchBestProduct, fetchRevenue, getDashBoardData };
