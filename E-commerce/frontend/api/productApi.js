import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products",
    }),

    getProduct: builder.query({
      query: (id) => "/api/products/" + id,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: "/api/products/" + id,
        method: "PUT",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} = productsApi;
