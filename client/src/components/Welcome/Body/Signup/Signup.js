import React, { useState } from "react";
import "./Signup.css";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
const Signup = () => {
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
    <div className="signupContainer">
      {route && <Redirect to={{ pathname: "/home" }} />}
      <h3 align="center">Signup</h3>
      <div className="media-buttons">
        <div className="mr-3">
          <button className="btn btn-md btn-danger">
            continue with
            <br />
            <i className="fa fa-google" aria-hidden="true"></i> <b>Google</b>
          </button>
        </div>
        <div className="mr-3">
          <button className="btn btn-md btn-primary">
            continue with
            <br />
            <i className="fa fa-facebook-official" aria-hidden="true"></i>{" "}
            <b> facebook</b>
          </button>
        </div>
        <div>
          <button className="btn btn-md btn-info">
            continue with
            <br />
            <i className="fa fa-twitter-square" aria-hidden="true"></i>
            <b> Twitter</b>
          </button>
        </div>
      </div>
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <div className="row ml-0 mt-2">
            <div className="form-group col-6">
              <input
                className="form-control"
                placeholder="firstname"
                name="firstname"
                id="firstname"
                type="text"
                {...formik.getFieldProps("firstname")}
              />
              {formik.errors.firstname && formik.touched.firstname ? (
                <div className="error">{formik.errors.firstname}</div>
              ) : null}
            </div>
            <div className="form-group col-6">
              <input
                type="text"
                className="form-control"
                placeholder="lastname"
                name="lastname"
                id="lastname"
                {...formik.getFieldProps("lastname")}
              />
              {formik.errors.lastname && formik.touched.lastname ? (
                <div className="error">{formik.errors.lastname}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group ml-3">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              name="email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group ml-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group ml-3" align="center">
            <button className="btn btn-success btn-block col-5" type="submit">
              Signup
            </button>
            <small>
              By Signing up you agree to our
              <a href="/">
                <b> Privacy Policy</b>
              </a>{" "}
              and
              <a href="/">
                <b> Terms of use.</b>
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
