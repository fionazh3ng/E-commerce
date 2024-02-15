import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/orders",
  }),
  endpoints: (builder) => ({
    getOrdersCustomer: builder.query({
      query: ({ token }) => ({
        url: "/customer",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrdersAdmin: builder.mutation({
      query: ({ id, token }) => ({
        url: "/customer",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          id,
        },
      }),
    }),
    createOrder: builder.mutation({
      query: ({ token }) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetOrdersCustomerQuery,
  useGetOrdersAdminMutation,
  useCreateOrderMutation,
} = ordersApi;
