import { configureStore } from "@reduxjs/toolkit";

import { ordersApi } from "./ordersApi";
import orderSlice from "../slice/orderSlice";
import { cartApi } from "./cartApi";
import cartSlice from "../slice/cartSlice";
import { usersApi } from "./usersApi";
import { authApi } from "./authApi";
import usersSlice from "../slice/usersSlice";
import authSlice from "../slice/authSlice";

export const store = configureStore({
    reducer: {
      orderSlice, cartSlice, usersSlice, authSlice,
      [ordersApi.reducerPath]: ordersApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (
      getDefaultMiddleware //allows you to use is loading
    ) => getDefaultMiddleware().concat(ordersApi.middleware,cartApi.middleware, usersApi.middleware, authApi.middleware),
  });
  
