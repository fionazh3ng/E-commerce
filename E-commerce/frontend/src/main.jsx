import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "../api/store";
import AllProduct from "../components/AllProduct";
import SingleProduct from "../components/SingleProduct";
import UpdateProduct from "../components/UpdateProduct";
import App from "./App";
// import DeleteProduct from "../components/DeleteProduct";
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/allProduct" element={<AllProduct />} />
          <Route path="/:id" element={<SingleProduct />} />
          <Route path="/:id" element={<UpdateProduct />} />
          {/* <Route path="/:id" element={<DeleteProduct />} />  */}
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
