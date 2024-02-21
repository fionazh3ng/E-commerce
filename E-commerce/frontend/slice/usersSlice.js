import { usersApi } from "../api/usersApi";
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: { users: [], user: null },
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        // console.log(payload);
        return { ...state, users: payload };
      }
    );

    builder.addMatcher(
      usersApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        // console.log(payload);
        return { ...state, user: payload };
      }
    );

    
  },
});

export default usersSlice.reducer;
