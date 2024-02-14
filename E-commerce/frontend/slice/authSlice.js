import { authApi } from "../api/authApi";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { users: null, token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        return { ...state, token: payload.token, users: payload.user };
      }
    ),
      builder.addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          return { ...state, token: payload.token };
        }
      ),
      builder.addMatcher(
        authApi.endpoints.getUserInfo.matchFulfilled,
        (state, { payload }) => {
          return { ...state, users: payload };
        }
      );
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
