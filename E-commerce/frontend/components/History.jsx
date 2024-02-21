import React from "react";
import { useGetOrdersCustomerQuery } from "../api/ordersApi";
import { useSelector } from "react-redux";
import "../src/index.css";
import Navigation from "../components/Navigation";

export default function History() {
  const { token } = useSelector((state) => state.authSlice);
  const customer = useGetOrdersCustomerQuery({ token });
  const { order } = useSelector((state) => state.orderSlice);

  let newOrder = [];
  for (let i = 0; i < order.length; i++) {
    let totalPrice = 0;
    for (let x of order[i].productInfo) {
      totalPrice += x.productDescription.price;
    }
    newOrder.push({
      totalPrice,
      ...order[i],
    });
  }

  return (
    <>
      <Navigation></Navigation>
      <h1 className="margintop">History</h1>
      <hr />
      <div className="cart">
        {newOrder.map((order, index) => {
          return (
            <div key={index}>
              <div>Order Number: {order.id}</div>
              <div>
                Order Placed:{" "}
                {order.createdat.slice(0, order.createdat.search("T"))}
                <div>Total Price: {order.totalPrice}</div>
              </div>
              {order.productInfo.map((product) => {
                return (
                  <>
                    <div>{product.productDescription.name}</div>
                    <img
                      className="imgsize"
                      src={product.productDescription.url}
                      alt={product.productDescription.name}
                    />
                    <div>{product.productDescription.price}</div>
                  </>
                );
              })}
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
