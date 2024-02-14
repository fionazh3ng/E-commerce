import React from "react";
import { useGetOrdersCustomerQuery } from "../api/ordersApi";
import { useGetOrdersAdminMutation } from "../api/ordersApi";
import { useCreateOrderMutation } from "../api/ordersApi";
import { useGetCartQuery } from "../api/cartApi";
import { useAddToCartMutation } from "../api/cartApi";
import { useDeleteCartMutation } from "../api/cartApi";

import { useSelector } from "react-redux";

export default function Testing() {
  const { order } = useSelector((state) => state.orderSlice);
  const orders = useGetOrdersCustomerQuery({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3ODY5MzU3LCJleHAiOjE3MDc4NzI5NTd9.Opu8MlTz83ua_D0KdwVR67ev-ES1XwKpRj7J1SoBZbY",
  });

  const {admin} =useSelector((state)=>state.orderSlice)

  const admins = useGetOrdersAdminMutation({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3OTI2NDAzLCJleHAiOjE3MDc5MzAwMDN9.qw7r0fpb3MAE7K-S4e0EjYlFjDstAVYMpS5SQz94rdw",
  });

  const {cart} =useSelector((state)=>state.cartSlice)

  const carts = useGetCartQuery({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3OTI2NDAzLCJleHAiOjE3MDc5MzAwMDN9.qw7r0fpb3MAE7K-S4e0EjYlFjDstAVYMpS5SQz94rdw",
  });

  console.log(cart);
  if (!carts.isLoading) console.log(carts);

  return <div>hello world</div>;
}
