import React from "react";
import { useGetOrdersCustomerQuery } from "../api/ordersApi";
import { useSelector } from "react-redux";
import "../src/index.css";

export default function History() {
  const customer = useGetOrdersCustomerQuery({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3OTY1NDQ4LCJleHAiOjE3MDc5NjkwNDh9.r6EkyesQHud8BOCEq1B-27XMcSRDsWtDYWT_gnu8Oz0",
  });
  const { order } = useSelector((state) => state.orderSlice);
  console.log(order);
  return (
    <div className="cart">
      {order.map((order) => {
        return (
          <div>
            <div>{order.id}</div>
            <div>{order.createdAt}</div>
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
  );
}
