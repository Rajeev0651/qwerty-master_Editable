import React, { useState, useEffect } from "react";
import "./Welcome.css";
import Heading from "./Heading/Heading";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { Redirect } from "react-router-dom";
const Welcome = () => {
  const [valid, SetValid] = useState(false);
  useEffect(() => {
    fetch("https://localhost:5000/", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        data.user === "authenticated" && SetValid(true);
      });
  }, []);
  return (
    <div>
      {valid && <Redirect to={{ pathname: "/home" }} />}
      <div className="welcome">
        <Heading />
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default Welcome;
