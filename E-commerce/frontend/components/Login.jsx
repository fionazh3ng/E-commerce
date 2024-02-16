import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [data] = useLoginUserMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await data(form);
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <label>
            Email: <input type="email" name="email" onChange={onChange}></input>
          </label>
          <label>
            Password:{" "}
            <input type="password" name="password" onChange={onChange}></input>
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
