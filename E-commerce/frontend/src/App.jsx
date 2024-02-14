import React from "react";
import Users from "../components/Users";
import SingleUser from "../components/SingleUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/users/:id" element={<SingleUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
