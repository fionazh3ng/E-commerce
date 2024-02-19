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
      query: (id) => "/api/users/" + id,
    }),

    updateUser: builder.mutation({
      query: ({ id, firstname, lastname, email, password }) => ({
        url: "/api/users/" + id,
        method: "PUT",
        body: {
          firstname,
          lastname,
          email,
          password,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } =
  usersApi;
