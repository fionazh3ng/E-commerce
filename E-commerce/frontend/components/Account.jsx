import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { users, token } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/users/me/${users.id}`);
  };
  return (
    <div>
      <Navigation></Navigation>
      {users && (
        <div className="user-detail">
          <h2>Account Details </h2>
          <hr />
          <h4>Id: {users.id}</h4>
          <h4>First Name: {users.firstname}</h4>
          <h4>Last Name: {users.lastname}</h4>
          <h4>Email: {users.email}</h4>
          <h4>Password: {users.password}</h4>
          <button onClick={onEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}