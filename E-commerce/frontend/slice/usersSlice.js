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
        console.log(payload);
        return { ...state, user: payload };
      }
    );

    builder.addMatcher(
      // PUT
      usersApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.users = state.users.map((user) => {
          if (user.id === payload.user.id) {
            return payload.user;
          }
          return user;
        });
        return state;
      }
    );
  },
});

export default usersSlice.reducer;
