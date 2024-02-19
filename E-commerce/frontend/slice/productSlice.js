// productSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the initial state
const initialState = {
  product: null,
  products: [],
  loading: false,
  error: null,
};

export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    dispatch(fetchSuccess(product));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: product,
    });
    dispatch(fetchSuccess(updatedProduct));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const products = await prisma.product.findMany();
    dispatch(fetchAllSuccess(products));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Create a slice for managing product state
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    fetchSuccess(state, action) {
      state.product = action.payload;
    },
    fetchAllSuccess(state, action) {
      state.products = action.payload;
    },
  },
});
export default productSlice.reducer;
