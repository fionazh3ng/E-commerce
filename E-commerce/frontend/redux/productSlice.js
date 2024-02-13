// productSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  product: null,
  products: [],
  loading: false,
  error: null,
};

export const fetchProduct = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductStart());
    const response = await axios.get(`/api/products/${productId}`);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch(updateProductStart());
    const response = await axios.put(`/api/products/${product.id}`, product);
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    dispatch(updateProductFailure(error.message));
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch(fetchAllProductsStart());
    const response = await axios.get("/api/products");
    dispatch(fetchAllProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchAllProductsFailure(error.message));
  }
};

// Create a slice for managing product state
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    fetchProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    updateProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchAllProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default productSlice.reducer;
