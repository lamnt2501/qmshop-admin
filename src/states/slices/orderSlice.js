import { createSelector, createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: "",
  },
  reducers: {
    dataLoaded(state, action) {
      state.orders = action.payload;
    },
  },
});

export default orderSlice.reducer;

export const { dataLoaded } = orderSlice.actions;
