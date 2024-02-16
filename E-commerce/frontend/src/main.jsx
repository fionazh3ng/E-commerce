import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import './index.css'
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../api/store.js";
import Users from "../components/Users.jsx";
import SingleUser from "../components/SingleUser.jsx";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import Account from "../components/Account.jsx";
import AllProduct from "../components/AllProduct";
import SingleProduct from "../components/SingleProduct";
import UpdateProduct from "../components/UpdateProduct";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/allProduct" element={<AllProduct />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/" element={<App />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:id" element={<SingleUser />}></Route>
          <Route path="/users/register" element={<Register />}></Route>
          <Route path="/users/login" element={<Login />}></Route>
          <Route path="/users/me" element={<Account />}></Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
