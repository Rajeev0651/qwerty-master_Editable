import React from "react";
import "./Body.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Image from './StartUp.jpg'
const Body = () => (
  <div className="container-fluid">
    <div className="row content">
      <div className="body container" className="col-sm-8" style={{marginLeft : "0px"}}>
        <img src = {Image} height="100%" width="100%"></img>
      </div>
      <div className="body container" className="col-sm-4">
        <Login />
        <Signup />
      </div>
    </div>
  </div>
);

export default Body;
