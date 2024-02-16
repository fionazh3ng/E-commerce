import { api } from "../redux/api";
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],

  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getusers.matchFulfilled,
      (state, { payload }) => {
        // console.log(payload);
        return payload;
      }
    );
  },
});

export default usersSlice.reducer;