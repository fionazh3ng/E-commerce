import React, { useEffect, useState } from "react";
import { useGetCartQuery } from "../api/cartApi";
import { useSelector } from "react-redux";
import "../src/index.css";
import { useCreateOrderMutation } from "../api/ordersApi";
import Navigation from "../components/Navigation";

export default function Cart() {
  const { token } = useSelector((state) => state.authSlice);
  console.log(token);
  const getCart = useGetCartQuery({ token });
  const { cart } = useSelector((state) => state.cartSlice);
  const [createOrder] = useCreateOrderMutation();

  const [session, setSession] = useState({ cart: [], counter: {} });

  useEffect(() => {
    const setCart = () => {
      const data = {
        cart: JSON.parse(window.sessionStorage.cart),
        counter: JSON.parse(window.sessionStorage.counter),
      };
      setSession(data);
    };
    if (!token && window.sessionStorage.cart) setCart();
  }, []);

  const checkout = async () => {
    await createOrder({ token });
  };
  return (
    <>
      <Navigation></Navigation>
      {(!token && session.cart.length && (
        <div className="cart">
          {session.cart.map((item) => {
            return (
              <div key={item.productid}>
                <h3>
                  {item.productname} - ${item.productprice}
                </h3>
                <img src={item.producturl} alt={item.productname} />
                <div>
                  <button
                    id={item.productid}
                    onClick={(e) => {
                      if (session.cart.length === 1) {
                        window.sessionStorage.removeItem("cart");
                        window.sessionStorage.removeItem("counter");
                        setSession({ cart: [], counter: {} });
                        return;
                      }
                      let cart = session.cart;
                      const counter = session.counter;
                      console.log(cart, e.target.id);
                      cart = cart.filter(
                        (item) => item.productid != e.target.id
                      );
                      counter[e.target.id] = false;
                      setSession({ cart, counter });
                      window.sessionStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                      );
                      window.sessionStorage.setItem(
                        "counter",
                        JSON.stringify(counter)
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )) || (
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
      )}
      {token && !cart.length && (<>No Items In Cart</>)}
      {token && cart.length && <button onClick={checkout}>checkout</button>}
      {!token && !session.cart && <>No items</>}
    </>
  );
}
