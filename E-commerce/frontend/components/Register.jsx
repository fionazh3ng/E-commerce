import React, { useState } from "react";
import { useRegisterUserMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Register() {
  const [addNewUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const results = addNewUser(form);
    // console.log(results);
    navigate("/users/me");
  };

  return (
    <>
      <Navigation></Navigation>
      <div>
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={onChange}
              required
            ></input>
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={onChange}
              required
            ></input>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              required
            ></input>
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              required
            ></input>
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
