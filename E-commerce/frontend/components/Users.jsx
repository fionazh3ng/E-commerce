import React from "react";
import { useGetUsersQuery } from "../api/usersApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";

function Users() {
  const { token } = useSelector((state) => state.authSlice);
  const { data } = useGetUsersQuery({ token }); // making api call
  const { users } = useSelector((state) => state.usersSlice); // making call to state
  // console.log(users);

  return (
    <>
      <Navigation></Navigation>
      <div className="all-users">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h2>ID: {user.id} </h2>
              <h2>First Name: {user.firstname}</h2>
              <h2>Last Name: {user.lastname}</h2>
              <h2>Email: {user.email}</h2>
              <Link to={`/users/${user.id}`}>See Detail</Link>
              <hr/>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Users;
