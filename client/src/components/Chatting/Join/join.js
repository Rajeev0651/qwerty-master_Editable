import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./join.css";

/* Formik and Yup*/
const validationSchema = Yup.object({
  id: Yup.string().required("Required"),
  pass: Yup.string().required("Required"),
});
const initialValues = {
  id: "",
  pass: "",
};
const user_validation = {
  room_access: false,
  userId: "",
  userRoom: "",
};

const Join = () => {
  var history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  function onSubmit(values) {
    console.log(values.id, values.pass);
    fetch("http://localhost:3001/permission", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID: values.id, room: values.pass }),
    })
      .then((response) => response.json())
      .then((data) => {
        user_validation.room_access = data ? true : false;
        console.log(user_validation.room_access);
      })
      .then(() => {
        if (user_validation.room_access === true) {
          history.push(`/chat?name=${values.id}&room=${values.pass}`);
        }
      });
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="id"
              className="joinInput"
              onChange={formik.handleChange}
              value={formik.values.id}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Room"
              name="pass"
              className="joinInput mt-20"
              onChange={formik.handleChange}
              value={formik.values.pass}
              onBlur={formik.handleBlur}
            />
          </div>
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
