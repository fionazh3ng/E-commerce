// App.jsx
import React from "react";
import AllProduct from "../components/AllProduct";
import SingleProduct from "../components/SingleProduct";
import UpdateProduct from "../components/UpdateProduct";
// import DeleteProduct from "../components/DeleteProduct";

const App = () => {
  return (
    <div>
      <h1>Welcome to our Store!</h1>

      <AllProduct></AllProduct>
      <SingleProduct></SingleProduct>
      <UpdateProduct></UpdateProduct>
      {/* <DeleteProduct></DeleteProduct> */}
    </div>
  );
};

export default App;
