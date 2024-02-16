import React from "react";
import { useGetProductQuery } from "../api/productApi";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductQuery(id);

  let productDetails = null;

  if (isLoading) {
    productDetails = <div>Loading...</div>;
  } else if (isError) {
    productDetails = <div>Error: Unable to fetch product details</div>;
  } else if (product) {
    const { name, price, description } = product;

    productDetails = (
      <div>
        <h2>{name}</h2>
        <p>Price: {price}</p>
        <p>Description: {description}</p>
      </div>
    );
  }

  return <div>{productDetails}</div>;
};

export default SingleProduct;
