// AllProduct.jsx
import React, { useEffect } from "react";
import { useGetProductsQuery } from "../api/productApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../api/cartApi";
import img from "../src/assets/add-to-cart-3046.png";

const AllProduct = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const result = useGetProductsQuery();
  const { users } = useSelector((state) => state.authSlice);
  const { token } = useSelector((state) => state.authSlice);
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();
  useEffect(() => {}, [products, error, isLoading]);

  const cartSession = (e) => {
    if (window.sessionStorage.cart) {
      //get cart
      const cart = JSON.parse(window.sessionStorage.cart);
      //get counter
      const counter = JSON.parse(window.sessionStorage.counter);
      //if item in cart exit
      if (counter[e.target.dataset.targetId]) return;
      //set item to true
      counter[e.target.dataset.targetId] = true;
      //add item into cart
      cart.push({
        productid: e.target.dataset.targetId,
        productname: e.target.dataset.targetName,
        producturl: e.target.dataset.targetUrl,
        productprice: e.target.dataset.targetPrice,
      });
      //update cart with new item
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      //update counter
      window.sessionStorage.setItem("counter", JSON.stringify(counter));
    } else {
      //create cart
      window.sessionStorage.setItem(
        "cart",
        JSON.stringify([
          {
            productid: e.target.dataset.targetId,
            productname: e.target.dataset.targetName,
            producturl: e.target.dataset.targetUrl,
            productprice: e.target.dataset.targetPrice,
          },
        ])
      );
      //create counter
      window.sessionStorage.setItem(
        "counter",
        JSON.stringify({ [e.target.dataset.targetId]: true })
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="productTitle">All Products</h1>
      {token && users.isadmin && (
        <div>
          <button onClick={() => {}}>Create</button>
        </div>
      )}
      <div className="product-list cart">
        {products.map((product) => (
          <div className="soloItems" key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.url} alt={product.name} />
            <h4>${product.price}</h4>

            {/* {token && users.isadmin && ( */}
            <div className="addImg">
              <img
                src={img}
                alt="add"
                className="productButton"
                id={product.id}
                data-target-id={product.id}
                data-target-name={product.name}
                data-target-url={product.url}
                data-target-price={product.price}
                style={{ height: "50px", width: "50px" }}
                onClick={(e) => {
                  //guest user? save to session
                  return !token
                    ? cartSession(e)
                    : addToCart({ productid: Number(e.target.id), token });
                }}
              />
              {/* <button
                className="productButton"
                id={product.id}
                data-target-id={product.id}
                data-target-name={product.name}
                data-target-url={product.url}
                data-target-price={product.price}
                onClick={(e) => {
                  //guest user? save to session
                  return !token
                    ? cartSession(e)
                    : addToCart({ productid: Number(e.target.id), token });
                }}
              >
                Add To Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
