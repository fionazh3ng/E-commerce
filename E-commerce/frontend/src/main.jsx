import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../api/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/users/:id" element={<SingleUser />}></Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
