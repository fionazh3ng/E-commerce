// Import necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API client using createApi
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  // Define endpoints for your API
  endpoints: (builder) => ({
    // Endpoint for fetching all products
    getProducts: builder.query({
      query: () => "/api/products",
    }),

    // Endpoint for fetching a single product by ID
    getProduct: builder.query({
      query: (id) => "/api/products/" + id,
    }),

    // Endpoint for updating a product
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: "/api/products/" + id,
        method: "PUT",
        body: product,
      }),
    }),

    // Endpoint for creating a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/api/products",
        method: "POST",
        body: newProduct,
      }),
    }),
  }),
});

// Export hooks for accessing the endpoints
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} = productsApi;
