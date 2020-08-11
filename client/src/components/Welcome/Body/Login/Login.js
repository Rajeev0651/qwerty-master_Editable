import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [route, setRoute] = useState(false);
  const initialValues = {
    loginemail: "",
    loginpassword: "",
  };
  const validate = (values) => {
    const errors = {};
    if (!values.loginemail) errors.loginemail = "Required!";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.loginemail)
    )
      errors.loginemail = "Invalid Email!";
    if (!values.loginpassword) errors.loginpassword = "Required!";
    return errors;
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      fetch("https://localhost:5000/login", {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRoute(true);
        })
        .catch((err) => console.log(err));
    },
  });
  return route ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <React.Fragment>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="loginemail"
          autoComplete="email"
          autoFocus
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.loginemail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="loginpassword"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.loginpassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Login;
