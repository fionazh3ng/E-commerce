import React from "react";
import { useGetUsersQuery } from "../api/usersApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Users() {
  const { data } = useGetUsersQuery();

  return (
    <div className="all-players">
      {data.map((user) => {
        return (
          <div key={user.id}>
            <h2>{user.id}</h2>
            <h2>{user.firstname}</h2>
            <h2>{user.lastname}</h2>
            <h2>{user.email}</h2>
            <Link to={`/users/${user.id}`}>See User Info</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
