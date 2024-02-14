import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../slice/productSlice";
import ProductList from "../api/productApi";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default App;
