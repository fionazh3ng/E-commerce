import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateProductMutation } from "../api/productApi";
import Navigation from "../components/Navigation";

const UpdateProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...product });

  const [updateProduct, { isLoading, isError }] = useUpdateProductMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitting updated product:", formData); // Adding console.log here
    dispatch(updateProduct(formData));
  };

  if (isLoading) {
    return <div>Updating product...</div>;
  }

  if (isError) {
    return <div>Error: Unable to update product</div>;
  }

  return (<>
 <Navigation></Navigation>
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
    </>
  );
};

export default UpdateProduct;
