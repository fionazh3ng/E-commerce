import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../api/usersApi";
import { useGetOrdersAdminMutation } from "../api/ordersApi";
import Navigation from "../components/Navigation";
import { useEffect } from "react";

export default function SingleUser() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.authSlice);
  const users = useGetUserQuery({ id, token });
  const user = useSelector((state) => state.usersSlice);

  const [orders] = useGetOrdersAdminMutation();
  useEffect(() => {
    const loadOrders = () => {
      orders({ id: Number(id), token });
    };
    if (token) loadOrders();
  }, []);

  const order = useSelector((state) => state.orderSlice);
  console.log(order.order);

  return (
    <>
      <Navigation></Navigation>
      <div className="single-user">
        <h2>User Details: </h2>
        <h4>ID: {user?.user?.id}</h4>
        <p>First Name: {user?.user?.firstname}</p>
        <p>Last Name: {user?.user?.lastname}</p>
        <p>Email: {user?.user?.email}</p>
      </div>
      <div className="user-orders">
        <h2>Order History:</h2>
        {order.order.length &&
          order.order.map((item) => {
            // if (item.userid === id) {
            return (
              <div key={item.id}>
                <h4>Order Number: {item.id}</h4>
                <p>{item.createdat}</p>
                {item.productInfo.map((itm) => {
                  return (
                    <div key={item.id}>
                      <h4>{itm.productDescription.name}</h4>
                      {/* <img src={itm.productDescription.url} /> */}
                    </div>
                  );
                })}
              </div>
            );
            // }
          })}
      </div>
    </>
  );
}
