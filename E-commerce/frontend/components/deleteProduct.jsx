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

export default DeleteProduct;
