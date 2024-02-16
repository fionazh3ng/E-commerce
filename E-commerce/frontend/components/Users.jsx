import React from "react";
import { useGetUsersQuery } from "../api/usersApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Users() {
  const { data } = useGetUsersQuery(); // making api call
  const { users } = useSelector((state) => state.usersSlice); // making call to state
  // console.log(users);

  return (
    <div className="all-users">
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h2>{user.id}</h2>
            <h2>{user.firstname}</h2>
            <h2>{user.lastname}</h2>
            <h2>{user.email}</h2>
            <Link to={`/users/${user.id}`}>See Detail</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
