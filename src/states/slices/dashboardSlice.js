import { createSlice } from "@reduxjs/toolkit";

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
    },
  },
});

export default dashboardSlice.reducer;

export const { dataLoaded } = dashboardSlice.actions;
