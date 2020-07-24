import React from "react";
import "./Body.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
const Body = () => (
  <div className="container-fluid text-center">
    <div class="row content">
      <div className="body container" className="col-sm-8">
        Grow Big
      </div>
      <div className="body container" className="col-sm-4">
        <Login />
        <Signup />
      </div>
    </div>
  </div>
);

export default Body;
