import axiosFactory from "../configs/axiosConfig";

export async function fetchCustomers(params) {
  const api = axiosFactory();
  try {
    return (await api.get(`/users${params ? "?" + params : ""}`)).data;
  } catch (error) {
    return { error };
  }
}

export async function fetchCustomerById(id) {
  const api = axiosFactory();
  try {
    return (await api.get(`/users/${id}`)).data;
  } catch (error) {
    return { error };
  }
}

export async function fetchCustomerByEmail(email) {
  const api = axiosFactory();
  const data = new FormData();
  data.append("email", email);
  try {
    return (await api.post(`/users/email`, data)).data;
  } catch (error) {
    return { error };
  }
}

export async function fetchTopCustomerById(id) {
  const api = axiosFactory();

  try {
    return (await api.get(`/users/${id}/memberShip`)).data;
  } catch (error) {
    return { error };
  }
}
