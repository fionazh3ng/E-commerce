// AllProduct.jsx
import React, { useEffect } from "react";
import { useGetProductsQuery } from "../api/productApi";

const AllProduct = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
console.log("hello world");
  const result = useGetProductsQuery()
console.log("get");
console.log (result)
  useEffect(() => {
    // console.log("Products:", products);
    // console.log("Error:", error);
    // console.log("Loading:", isLoading);
  }, [products, error, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      
      <h1>All Product</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AllProduct;
