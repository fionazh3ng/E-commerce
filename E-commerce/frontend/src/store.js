import { configureStore } from "@reduxjs/toolkit";
import { api } from "../redux/api";
import usersSlice from "../redux/usersSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: usersSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
