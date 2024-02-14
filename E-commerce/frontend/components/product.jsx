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

// DeleteProduct.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@reduxjs/toolkit/query/react";
import { deleteProduct } from "../api/productApi";

const DeleteProduct = ({ productId }) => {
  const dispatch = useDispatch();

  const [mutate, { isLoading, isError }] = useMutation(deleteProduct);

  const handleDelete = () => {
    console.log("Deleting product...");
    dispatch(mutate(productId));
  };

  if (isLoading) {
    return <div>Deleting product...</div>;
  }

  if (isError) {
    return <div>Error: Unable to delete product</div>;
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
};

// SingleProduct.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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

// UpdateProduct.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateProductMutation } from "../api/productApi";

const UpdateProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...product });

  const [updateProduct, { isLoading, isError }] = useUpdateProductMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting updated product:", formData);
    dispatch(updateProduct(formData));
  };

  if (isLoading) {
    return <div>Updating product...</div>;
  }

  if (isError) {
    return <div>Error: Unable to update product</div>;
  }

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export { AppProduct, DeleteProduct, SingleProduct, UpdateProduct };
