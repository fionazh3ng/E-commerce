import React from "react";
import SingleProduct from "./singleProduct";

const AppProduct = () => {
  const productId = "exampleProductId";

  return (
    <div>
      <h1>Product Details</h1>
      <SingleProduct productId={productId} />
    </div>
  );
};

export default AppProduct;
