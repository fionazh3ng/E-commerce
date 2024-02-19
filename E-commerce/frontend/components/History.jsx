import React from "react";
import { useGetOrdersCustomerQuery } from "../api/ordersApi";
import { useSelector } from "react-redux";
import "../src/index.css";
import Navigation from "../components/Navigation";

export default function History() {
  const { token } = useSelector((state) => state.authSlice);
  const customer = useGetOrdersCustomerQuery({ token });
  const { order } = useSelector((state) => state.orderSlice);
  return (
    <>
      <Navigation></Navigation>
      <div className="cart">
        {order.map((order) => {
          return (
            <div>
              <div>Order Number: {order.id}</div>
              <div>Order Placed: {order.createdat.slice(0,order.createdat.search("T"))}</div>
              {order.productInfo.map((product) => {
                return (
                  <>
                    <div>{product.productDescription.name}</div>
                    <img
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
