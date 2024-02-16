import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Import your reducer(s) here

const store = configureStore({
  reducer: {
    product: productReducer, // Add your reducer(s) here
    // If you have multiple reducers, you can combine them like this:
    // reducer1: reducer1,
    // reducer2: reducer2,
    // and so on...
  },
  // Optionally, you can apply middleware here:
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(yourMiddleware),
});

export default store;
