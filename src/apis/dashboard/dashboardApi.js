import axios from "axios";
import Cookies from "js-cookie";
import { VITE_MANAGEMENT_API_URL } from "../../configs/envConfig";

async function getDashBoardData() {
  const token = Cookies.get("accessToken");

  const api = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const orderSummary = (
      await api.get(`${VITE_MANAGEMENT_API_URL}/orders/summary`, {})
    ).data;

    const paymentStatistic = (
      await api.get(`${VITE_MANAGEMENT_API_URL}/payments/gateway-statistic`)
    ).data;

    const bestProducts = (
      await api.get(`${VITE_MANAGEMENT_API_URL}/orders/product-best-seller`)
    ).data;

    return { orderSummary, paymentStatistic, bestProducts };
  } catch (err) {
    // console.log(err);
    return { error: err };
  }
}

export default getDashBoardData;
