import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { authApi } from "./authApi";
import usersSlice from "../slice/usersSlice";
import authSlice from "../slice/authSlice";

const store = configureStore({
  reducer: {
    usersSlice,
    authSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, authApi.middleware),
});

export default store;
