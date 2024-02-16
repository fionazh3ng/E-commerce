import React from "react";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
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
