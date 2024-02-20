import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../api/usersApi";
import Navigation from "../components/Navigation";

export default function SingleUser() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.authSlice);
  const users = useGetUserQuery({ id, token });
  console.log(users);
  const user = useSelector((state) => state.usersSlice);

  return (
    <>
      <Navigation></Navigation>
      <div className="single-user">
        <h2>ID: {user.user.id}</h2>
        <p>First Name: {user.user.firstname}</p>
        <p>Last Name: {user.user.lastname}</p>
        <p>Email: {user.user.email}</p>
      </div>
    </>
  );
}
