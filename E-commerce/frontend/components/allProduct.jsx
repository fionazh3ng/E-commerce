// AllProduct.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../api/productApi";
import { useSelector, useDispatch } from "react-redux";
import { createProductSuccess } from "../slice/productSlice";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery();
  const { users, token } = useSelector((state) => state.authSlice);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [createProduct] = useCreateProductMutation();

  useEffect(() => {}, [products, error, isLoading]);

  const handleCreateProduct = () => {
    setShowCreateForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProduct({
        name: productName,
        price: productPrice,
        description: productDescription,
      });
      dispatch(createProductSuccess(response.data));
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>All Product</h1>
      {token && users.isadmin && (
        <div>
          <button onClick={handleCreateProduct}>Create</button>
          {showCreateForm && (
            <form onSubmit={handleSubmit}>
              <label>
                Product Name:
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      )}
      <div className="product-list cart">
        {products.map((product) => (
          <div key={product.id}>
            <h2>
              <Link
                to={{
                  pathname: `/product/${product.id}`,
                  state: { imageUrl: product.url }, // Pass image URL as state
                }}
              >
                {product.name}
              </Link>
            </h2>
            <img src={product.url} alt={product.name} />
            <p>Price: ${product.price}</p>
            {token && users.isadmin && (
              <button
                onClick={() => handleUpdateProduct(product.id)}
              >
                Update
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
