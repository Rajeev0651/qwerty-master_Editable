import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [route, setRoute] = useState(false);
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstname) errors.firstname = "Required!";
    else if (values.firstname.length > 20)
      errors.firstname = "Max length is 20 characters!";

    if (!values.lastname) errors.lastname = "Required!";
    else if (values.lastname.length > 20)
      errors.lastname = "Max length is 20 characters!";

    if (!values.email) errors.email = "Required!";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = "Invalid Email!";

    if (!values.password) errors.password = "Redquired!";
    else if (values.password.length < 5)
      errors.password = "Password must be at least 5 characters long!";
    return errors;
  };

  const onSubmit = (values) => {
    fetch("https://localhost:5000/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.cookie = `token=${data.token}`;
        setRoute(true);
      });
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  return (
    <React.Fragment>
      {route && <Redirect to={{ pathname: "/home" }} />}
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid item xs={12}>
            <Typography variant="h7" color="inherit" noWrap>
              By Signing up you are agree with our{" "}
              <Link href="#" variant="body2">
                terms and conditions
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Signup;
