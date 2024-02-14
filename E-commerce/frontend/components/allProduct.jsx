// AppProduct.jsx
import React from "react";
import SingleProduct from "./SingleProduct";

const AppProduct = () => {
  const productId = "exampleProductId";

  console.log("Rendering AppProduct component");

  return (
    <div>
      <h1>Product Details</h1>
      <SingleProduct productId={productId} />
    </div>
  );
};
s