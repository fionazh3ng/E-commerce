import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/cart",
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: ({ token }) => ({
        url: "/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addToCart: builder.mutation({
      query: (id) => ({
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
    deleteCart: builder.mutation({
      //delete one item in cart
      query: (id) => ({
        url: "/",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          id,
        },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useDeleteCartMutation } =
  cartApi;
