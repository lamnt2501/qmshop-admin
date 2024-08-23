import axios from "axios";
import axiosFactory from "../../configs/axiosConfig";
const api = axiosFactory();
export default async function fetchOrder(filter) {
  try {
    return (await api.get("/orders")).data;
  } catch (error) {
    return { error };
  }
}
