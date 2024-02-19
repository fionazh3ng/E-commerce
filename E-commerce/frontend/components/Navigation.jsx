import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setToken } from "../slice/authSlice";

export default function Navigation() {
  const { users } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setToken(null));
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        Home
      </button>

      {!token && (
        <>
          <button
            onClick={() => {
              navigate(`/users/login`);
            }}
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate(`/users/register`);
            }}
          >
            Register
          </button>
        </>
      )}
      {token && (
        <>
          <button
            onClick={() => {
              navigate(`/users/me`);
            }}
          >
            Account
          </button>
          <button
        onClick={() => {
          navigate(`/history`);
        }}
      >
        History
      </button>
          <button onClick={logout}>Logout</button>
        </>
      )}
         {token && users.isadmin &&<><button
        onClick={() => {
          navigate(`/users`);
        }}
      >
        User
      </button></>}
     
      <button
        onClick={() => {
          navigate(`/cart`);
        }}
      >
        Cart
      </button>
    </div>
    
  );
}
