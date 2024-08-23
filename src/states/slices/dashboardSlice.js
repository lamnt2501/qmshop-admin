import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBestProduct } from "../../apis/dashboard/dashboardApi";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    orderSummary: "",
    revenue: "",
    paymentStatistic: "",
    bestProducts: "",
    topCustomer: "",
  },
  reducers: {
    dataLoaded(state, action) {
      state.orderSummary = action.payload.orderSummary;
      state.paymentStatistic = action.payload.paymentStatistic;
      state.bestProducts = action.payload.bestProducts;
      state.topCustomer = action.payload.topCustomer;
      state.revenue = action.payload.revenue;
    },
  },
  extraReducers: (builders) => {},
});

export default dashboardSlice.reducer;

export const { dataLoaded } = dashboardSlice.actions;
export {};
