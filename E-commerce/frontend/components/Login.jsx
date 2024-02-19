import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/authApi";
import Navigation from "../components/Navigation";
import { useSessionAddToCartMutation } from "../api/cartApi";

export default function Login() {
  const [cart] = useSessionAddToCartMutation();
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

    const result = await data(form);

    if (!result.error && window.sessionStorage.cart) {
      let session = JSON.parse(window.sessionStorage.cart).map((cart) => {
        return {
          productid: Number(cart.productid),
          userid: result.data.user.id,
        };
      });
      cart({ cart: session, token: result.data.token });
      window.sessionStorage.removeItem("cart");
      window.sessionStorage.removeItem("counter");
    }
    navigate("/");
  };

  return (
    <>
      <Navigation></Navigation>
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
