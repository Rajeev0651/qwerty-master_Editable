import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { Grid, Paper, Button } from "@material-ui/core";
import Trending from "../Trending/Trending";
import RightBar from "../RightBar/RightBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function CreateTopic() {
  const classes = useStyles();
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
      console.log(document.cookie);
      fetch("https://localhost:5000/home/CreateTopic", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(setRoute(true))
        .catch((err) => console.log(err));
    },
  });
  return (
    <React.Fragment>
      {route && <Redirect to={{ pathname: "/home" }} />}
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Trending></Trending>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Heading..."
                    multiline
                    rowsMax={4}
                    name="Heading"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Heading}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Descritions..."
                    multiline
                    rows={8}
                    name="Descriptions"
                    value={formik.values.Descriptions}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    variant="outlined"
                  />
                </div>
                <Button variant="contained" color="primary" type="submit">
                  Post
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <RightBar></RightBar>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default CreateTopic;
