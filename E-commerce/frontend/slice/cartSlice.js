import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../api/cartApi";
import { ordersApi } from "../api/ordersApi";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart: [] },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.cart = payload;
        return state;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.addToCart.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.cart = payload;
        return state;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.deleteCart.matchFulfilled,
      (state, { payload }) => {
        // state.cart = state.cart.map((product) => {
        //   if (product.productid !== payload.productid) {
        //     return product;
        //   }
        // });
        // return state;
        state.cart = payload;
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.createOrder.matchFulfilled,
      (state) => {
        state.cart = [];
        return state;
      }
    );
  },
});
export default cartSlice.reducer;
