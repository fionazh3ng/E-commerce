import React from "react";
import { useGetProductQuery } from "../api/productApi";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";

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
        <h1 className="margintop">{name}</h1>
        <hr />
        <h2>{name}</h2>
        <p>Price: {price}</p>
        <img className="imagesingle" src={product.url} alt={name} />
        <p>Description: {description}</p>
      </div>
    );
  }

  return (
    <>
      <Navigation></Navigation>
      <div className="centera">{productDetails}</div>
    </>
  );
};

export default SingleProduct;
