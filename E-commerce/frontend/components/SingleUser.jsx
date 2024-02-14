import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../api/usersApi";
import { useUpdateUserMutation } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SingleUser() {
  const { id } = useParams();
  const { data } = useGetUserQuery(id);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [updatePlayer] = useUpdateUserMutation();

  return (
    <div className="single-user">
      <h2>{data?.id}</h2>
      <p>{data?.firstname}</p>
      <p>{data?.lastname}</p>
      <p>{data?.email}</p>
    </div>
  );
}
