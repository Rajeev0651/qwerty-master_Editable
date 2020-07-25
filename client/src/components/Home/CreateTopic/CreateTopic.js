import React, { useState } from "react";
import "./CreateTopic.css";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
function CreateTopic() {
  const [route, setRoute] = useState(false);
  const initialValues = {
    Heading: "",
    Descriptions: "",
  };
  const validate = (values) => {
    const errors = {};
    if (!values.Heading) errors.Heading = "Required!";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Heading))
      errors.Heading = "Required !!";
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log(document.cookie)
      fetch("https://localhost:5000/home/CreateTopic", {
        method: "POST",
        mode: "cors",
        headers: {
          "token" : document.cookie,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setRoute(true);
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div>
      {route && <Redirect to={{ pathname: "/home" }} />}
      <div className="heading">
        <h3 style={{ marginRight: "25px" }}>Create</h3>
      </div>
      <div className="card text-center">
        <form onSubmit={formik.handleSubmit}>
          <div
            className="form-group col-10 mb-1"
            style={{ marginLeft: "25px" }}
          >
            <div
              className="container"
              className="form-group col-10"
              style={{ marginLeft: "25px" }}
            ></div>
            <textarea
              type="text"
              id="heading"
              name="Heading"
              className="form-control"
              placeholder="Heading..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Heading}
            />
            {formik.errors.Heading && formik.touched.Heading ? (
              <div className="error">{formik.errors.Heading}</div>
            ) : null}
          </div>
          <div
            className="container"
            className="form-group col-10"
            style={{ marginLeft: "25px", marginTop: "70px" }}
          >
            <label htmlFor="description"></label>
            <textarea
              className="form-control"
              type="text"
              name="Descriptions"
              id="description"
              placeholder="Descriptions..."
              value={formik.values.Descriptions}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div
            className="form-group col-10"
            align="center"
            style={{ marginTop: "80px" }}
          >
            <button className="btn btn-success btn-block col-4" type="submit">
              Post
            </button>
          </div>
          <hr />
        </form>
      </div>
    </div>
  );
}

export default CreateTopic;
