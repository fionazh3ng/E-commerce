import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  // post, delete, patch uses mutation
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      // register
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
    }),

    loginUser: builder.mutation({
      // login
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),

    getUserInfo: builder.query({
      // get logged in user's detail
      query: (token) => ({
        url: "/auth/me",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserInfoQuery,
} = authApi;
