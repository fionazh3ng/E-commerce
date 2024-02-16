import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "./ordersApi";
import orderSlice from "../slice/orderSlice";
import { cartApi } from "./cartApi";
import cartSlice from "../slice/cartSlice";

export const store = configureStore({
    reducer: {
      orderSlice, cartSlice, 
      [ordersApi.reducerPath]: ordersApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer
    },
    middleware: (
      getDefaultMiddleware //allows you to use is loading
    ) => getDefaultMiddleware().concat(ordersApi.middleware,cartApi.middleware),
  });
  