import { createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "../api/ordersApi";

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: { order: [], newOrder: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ordersApi.endpoints.getOrdersCustomer.matchFulfilled,
      (state, { payload }) => {
        return { ...state, order: payload };
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.getOrdersAdmin.matchFulfilled,
      (state, { payload }) => {
        state.order = payload;
        return state;
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.createOrder.matchFulfilled,
      (state, { payload }) => {
        state.newOrder = payload;
        return state;
      }
    );
  },
});
export default orderSlice.reducer;
