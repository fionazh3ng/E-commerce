import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getusers: builder.query({
      query: () => "/api/users",
    }),
    getUser: builder.query({
      query: (id) => "/api/users/" + id,
    }),
    updateUser: builder.query({
      query: (id) => "/api/users/" + id,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = api;
