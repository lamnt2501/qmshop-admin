import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import orderReducer from "./slices/orderSlice";
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    order: orderReducer,
  },
});

export default store;
