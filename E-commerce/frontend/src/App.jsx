import React from "react";
import AllProduct from "../components/allProduct"; // Corrected import path
import "./App.css";
import Navigation from "../components/Navigation"; // Corrected import path

const App = () => {
  return (
    <div className="App">
      <Navigation></Navigation>
      <h1>Welcome to our Store!</h1>
      <AllProduct></AllProduct>
    </div>
  );
};

export default App; // Corrected export statement
