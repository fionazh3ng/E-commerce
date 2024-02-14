import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductQuery } from "../api/productApi";

const SingleProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const { data: product, isLoading, isError } = useGetProductQuery(productId);

  useEffect(() => {
    console.log("Fetching product details...");
    // Fetch product details when component mounts
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  let productDetails = null;

  if (isLoading) {
    productDetails = <div>Loading...</div>;
  } else if (isError) {
    productDetails = <div>Error: Unable to fetch product details</div>;
  } else if (product) {
    productDetails = (
      <div>
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
      </div>
    );
  }

  return <div>{productDetails}</div>;
};

export default SingleProduct;
