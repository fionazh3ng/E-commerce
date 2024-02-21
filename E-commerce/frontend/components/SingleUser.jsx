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

  let newOrder = [];
  for (let i = 0; i < order.order.length; i++) {
    let totalPrice = 0;
    for (let x of order.order[i].productInfo) {
      totalPrice += x.productDescription.price;
    }
    newOrder.push({
      totalPrice,
      ...order.order[i],
    });
  }
console.log(newOrder)
  return (
    <>
      <Navigation></Navigation>
      <h2></h2>
      <div className="single-user">
        <h2 className="margintop">User Details </h2>
        <hr/>
        <h4>ID: {user?.user?.id}</h4>
        <p>First Name: {user?.user?.firstname}</p>
        <p>Last Name: {user?.user?.lastname}</p>
        <p>Email: {user?.user?.email}</p>
      </div>
      <div className="user-orders" >
        <h2>Order History</h2>
        <hr/>
        {newOrder.length &&
          newOrder.map((item,index) => {
            // if (item.userid === id) {
            return (
              <div key={index}>
                <h4>Order Number: {item.id}</h4>
                <div>Total Price: {item.totalPrice}</div>
                <p>{item.createdat.slice(0, item.createdat.search("T"))}</p>
                {item.productInfo.map((itm) => {
                  return (
                    <div key={item.id}>
                      <h4>{itm.productDescription.name}</h4>
                      <img className="imgsize"src={itm.productDescription.url} />
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
