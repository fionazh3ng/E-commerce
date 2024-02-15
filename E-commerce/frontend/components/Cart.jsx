import React from "react";
import { useGetCartQuery } from "../api/cartApi";
import { useSelector } from "react-redux";
import "../src/index.css";
import { useCreateOrderMutation } from "../api/ordersApi";

export default function Cart() {
  const getCart = useGetCartQuery({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3OTY1NDQ4LCJleHAiOjE3MDc5NjkwNDh9.r6EkyesQHud8BOCEq1B-27XMcSRDsWtDYWT_gnu8Oz0",
  });
  const { cart } = useSelector((state) => state.cartSlice);
  const [createOrder] = useCreateOrderMutation();

  const checkout = async () => {
    await createOrder({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3OTY1NDQ4LCJleHAiOjE3MDc5NjkwNDh9.r6EkyesQHud8BOCEq1B-27XMcSRDsWtDYWT_gnu8Oz0",
    });
  };
  return (
    <>
      <div className="cart">
        {cart.map((cart) => {
          return (
            <div key={cart.id}>
              <div>{cart.productDescription.name}</div>
              <img
                src={cart.productDescription.url}
                alt={cart.productDescription.name}
              />
              <div>{cart.productDescription.price}</div>
            </div>
          );
        })}
      </div>
      <button onClick={checkout}>checkout</button>
    </>
  );
}
