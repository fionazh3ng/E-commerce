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
        // console.log(payload);
        return { ...state, user: payload };
      }
    ),
      builder.addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          // console.log(payload.token);
          return { ...state, token: payload.token };
        }
      ),
      builder.addMatcher(
        authApi.endpoints.getUserInfo.matchFulfilled,
        (state, { payload }) => {
          // console.log(payload);
          return { ...state, users: payload };
        }
      );
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
