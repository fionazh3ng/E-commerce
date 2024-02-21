import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ token }) => ({
        url: "/api/users",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getUser: builder.query({
      query: ({ id, token }) => ({
        url: "/api/users/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, firstname, lastname, password, token }) => ({
        url: "/api/users/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: {
          firstname,
          lastname,
          password,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } =
  usersApi;
