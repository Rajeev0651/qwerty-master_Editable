import React, { useState, useEffect } from "react";
import "./Welcome.css";
import Heading from "./Heading/Heading";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const Welcome = () => {
  const [valid, SetValid] = useState(false);
  const [connected, SetConnected] = useState(false);
  useEffect(() => {
    fetch("https://localhost:5000/", {
      method: "GET",
      mode: "cors",
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        data.status == "ok" && SetValid(true);
        SetConnected(true);
      });
  }, []);
  return (
    <React.Fragment>
      {valid == true ? (
        <Redirect to={{ pathname: "/home" }} />
      ) : connected ? (
        <React.Fragment>
          <Grid>
            <Heading />
            <Body />
            <Footer />
          </Grid>
        </React.Fragment>
      ) : (
        <h1>Loading</h1>
      )}
    </React.Fragment>
  );
};
export default Welcome;
