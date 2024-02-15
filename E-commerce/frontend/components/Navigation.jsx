import React from 'react'
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


export default function Navigation() {
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
    </div>
  )
}
