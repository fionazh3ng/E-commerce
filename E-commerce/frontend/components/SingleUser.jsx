import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../api/usersApi";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";

export default function SingleUser() {
  const { id } = useParams();
  const { data } = useGetUserQuery(id);
  const { user } = useSelector((state) => state.usersSlice);

  return (
    <>
    <Navigation></Navigation>
    <div className="single-user">
      <h2>{user?.id}</h2>
      <p>{user?.firstname}</p>
      <p>{user?.lastname}</p>
      <p>{user?.email}</p>
    </div>
    </>
  );
}
