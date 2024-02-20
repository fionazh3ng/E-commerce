// productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../api/productApi";

const productSlice = createSlice({
  name: "product",
  initialState: { products: [], product: null },
  reducers: {
    createProductSuccess: (state, action) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        return { ...state, products: payload };
      }
    );

    builder.addMatcher(
      productsApi.endpoints.getProduct.matchFulfilled,
      (state, { payload }) => {
        return { ...state, product: payload };
      }
    );

    builder.addMatcher(
      productsApi.endpoints.updateProduct.matchFulfilled,
      (state, { payload }) => {
        console.log("hit");
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.id === payload.product.id) {
              return payload.product;
            }
            return product;
          })
        };
      }
    );
  },
});

export const { createProductSuccess } = productSlice.actions;
export default productSlice.reducer;
