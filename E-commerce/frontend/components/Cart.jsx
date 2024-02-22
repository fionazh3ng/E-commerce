import React, { useEffect, useState } from "react";
import { useDeleteCartMutation, useGetCartQuery } from "../api/cartApi";
import { useSelector } from "react-redux";
import "../src/index.css";
import { useCreateOrderMutation } from "../api/ordersApi";
import Navigation from "../components/Navigation";

export default function Cart() {
  const { token } = useSelector((state) => state.authSlice);
  const [deleteItem] = useDeleteCartMutation();
  const getCart = useGetCartQuery({ token });
  const { cart } = useSelector((state) => state.cartSlice);
  const [createOrder] = useCreateOrderMutation();

  const [session, setSession] = useState({ cart: [] });
  let totalPrice = 0;
  let cartPrice = [];

  useEffect(() => {
    const setCart = () => {
      const data = {
        cart: JSON.parse(window.sessionStorage.cart),
      };
      setSession(data);
    };
    if (!token && window.sessionStorage.cart) setCart();
    // if (!token) {
    //   cartPrice = session.cart;
    //   cartPrice.forEach((x) => {
    //     totalPrice += Number(x.productprice);
    //   });
    // } else {
    //   cartPrice = cart;
    //   cartPrice.forEach((x) => {
    //     totalPrice += Number(x.productDescription.price);
    //   });
    // }
  }, []);

  const checkout = async () => {
    await createOrder({ token });
  };
  console.log(cart);
  
  if (!token) {
    cartPrice = session.cart;
    cartPrice.forEach((x) => {
      totalPrice += Number(x.productprice);
    });
  } else {
    cartPrice = cart;
    cartPrice.forEach((x) => {
      totalPrice += Number(x.productDescription.price);
    });
  }

  const remove = (id) => {
    console.log(id, token);
    deleteItem({
      id: Number(id),
      token,
    });
  };
  return (
    <>
      <Navigation></Navigation>
      <h1 className="margintop">Cart</h1>
      <hr />
      {(!token && session.cart.length && (
        <div className="cart">
          {session.cart.map((item, index) => {
            return (
              <div key={index}>
                <h3>
                  {item.productname} - ${item.productprice}
                </h3>
                <img
                  className="imgsize"
                  src={item.producturl}
                  alt={item.productname}
                />
                <div>
                  <button
                    id={item.productid}
                    onClick={(e) => {
                      if (session.cart.length === 1) {
                        window.sessionStorage.removeItem("cart");
                        setSession({ cart: [] });
                        return;
                      }
                      const cart = [];
                      console.log(cart, e.target.id);
                      let check = false;
                      for (let item of session.cart) {
                        if (item.productid === e.target.id && !check)
                          check = true;
                        else cart.push(item);
                      }
                      setSession({ cart });
                      window.sessionStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
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
                  className="imgsize"
                  src={cart.productDescription.url}
                  alt={cart.productDescription.name}
                />
                <div>{cart.productDescription.price}</div>
                <button
                  id={cart.productid}
                  onClick={(e) => {
                    remove(e.target.id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
      <h2>Total Price: {totalPrice.toFixed(2)}</h2>
      {token && !cart.length && <>No Items In Cart</>}
      {token && cart.length && <button onClick={checkout}>checkout</button>}
      {!token && !session.cart && <>No items</>}
    </>
  );
}
