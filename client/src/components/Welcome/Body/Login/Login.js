import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
const Login = () => {
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
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="loginContainer">
      {route && <Redirect to={{ pathname: "/home" }} />}
      <div className="heading">
        <h3>Login</h3>
      </div>
      <div className="loginform">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group col-10 mb-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="loginemail"
              name="loginemail"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loginemail}
            />
            {formik.errors.loginemail && formik.touched.loginemail ? (
              <div className="error">{formik.errors.loginemail}</div>
            ) : null}
          </div>
          <div className="form-group col-10">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="loginpassword"
              id="loginpassword"
              value={formik.values.loginpassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.loginpassword && formik.touched.loginpassword ? (
              <div className="error">{formik.errors.loginpassword}</div>
            ) : null}
            <small>
              <a href="/">Forgot Password?</a>
            </small>
          </div>
          <div className="form-group mb-0" align="center">
            <button className="btn btn-success btn-block col-4" type="submit">
              Login
            </button>
          </div>
          <hr />
        </form>
      </div>
    </div>
  );
};

export default Login;
