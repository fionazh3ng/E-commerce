import React from "react";
import { useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../api/authApi";

export default function Account() {
  const { users, token } = useSelector((state) => state.authSlice);
  const { data, isLoading } = useGetUserInfoQuery(token);

  if (!isLoading) {
    console.log(data);
  }

  return (
    <div>
      {data && (
        <div className="user-detail">
          <h2>Account Details: </h2>
          <h4>Id: {users.id}</h4>
          <h4>First Name: {users.firstname}</h4>
          <h4>Last Name: {users.lastname}</h4>
          <h4>Email: {users.email}</h4>
          <h4>Password: {users.email}</h4>
        </div>
      )}
    </div>
  );
}
