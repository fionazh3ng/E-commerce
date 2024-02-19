import React from "react";
import { useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../api/authApi";
import Navigation from "../components/Navigation";

export default function Account() {
  const { users, token } = useSelector((state) => state.authSlice);
  // console.log(users, token);
  // console.log(users);

  return (
    <div>
      <Navigation></Navigation>
      {users && (
        <div className="user-detail">
          <h2>Account Details </h2>
          <hr/>
          <h4>Id: {users.id}</h4>
          <h4>First Name: {users.firstname}</h4>
          <h4>Last Name: {users.lastname}</h4>
          <h4>Email: {users.email}</h4>
          <h4>Password: {users.password}</h4>
        </div>
      )}
    </div>
  );
}
