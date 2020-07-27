import React, { useState, useEffect } from "react";
import "./Welcome.css";
import Heading from "./Heading/Heading";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

const Welcome = () => {
  const classes = useStyles();
  const [valid, SetValid] = useState(false);
  const [connected, SetConnected] = useState(false);
  useEffect(() => {
    fetch("https://localhost:5000/", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        data.user === "authenticated" && SetValid(true);
        SetConnected(true);
      });
  }, []);
  return (
    <React.Fragment>
      {valid ? (
        <Redirect to={{ pathname: "/home" }} />
      ) : connected ? (
          <React.Fragment>
          <CssBaseline />
          <Heading />
          <Body />
          <Footer />
          </React.Fragment>
      ) : (
        <h1>Loading</h1>
      )}
      </React.Fragment>
  );
};
export default Welcome;
