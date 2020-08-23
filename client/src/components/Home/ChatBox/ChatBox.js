import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ScrollToBottom from "react-scroll-to-bottom";
import { useFormik } from "formik";
import socketIOClient from "socket.io-client";
import { Avatar, Container, Card } from "@material-ui/core";
import "react-chat-widget/lib/styles.css";
import { css } from "glamor";
import { useLocation, Redirect } from "react-router-dom";
const axios = require("axios").default;

const ROOT_CSS = css({
  height: 550,
});

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  message: {
    height: theme.spacing(6),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: "20px",
  },
  root: {
    width: "100%",
    height: 60,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
let socket;

function ChatBox(props) {
  let location = useLocation();
  const [valid, SetValid] = useState(false);
  const [name, SetName] = useState("");
  const [room, SetRoom] = useState("");
  const [userid, SetUserId] = useState("");
  const [connected, SetConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [senders, setSenders] = useState([]);
  const [time, setTime] = useState([]);
  const ENDPOINT = "https://localhost:5000/chatroom";
  const classes = useStyles();

  const initialValues = {
    text: "",
  };
  const validate = (values) => {
    const errors = {};
    if (!values.text) errors.text = "Required!";
    errors.text = "Required !!";
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values, { resetForm }) => {
      if (values.text !== "") {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        socket.emit("client-message", {
          Name: name,
          UserId: userid,
          Room: room,
          message: values.text,
          time: time,
        });
      }
      resetForm({ values: "" });
    },
  });

  useEffect(() => {
    (async () => {
      const response = await axios({
        method: "get",
        url: "https://localhost:5000/",
        mode: "cors",
        withCredentials: true,
      });
      const data = await response.data;
      if (location.state === undefined) {
        SetConnected(true);
        SetValid(false);
      }
      if (data.status === "ok" && location.state !== undefined) {
        SetName(location.state.Name);
        SetRoom(location.state.Room);
        SetUserId(location.state.UserId);
        SetValid(true);
        SetConnected(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (name !== "" && room !== "" && userid !== "") {
      console.log("Socket : ", name, room, userid);
      socket = socketIOClient.connect(ENDPOINT);
      socket.emit("Join", { Name: name, Room: room, UserId: userid }, (err) => {
        if (err) {
          alert(err);
        }
      });
      socket.on("message", ({ Name, Room, message, currenttime }) => {
        setMessages((messages) => [...messages, message]);
        setSenders((senders) => [...senders, Name]);
        setTime((time) => [...time, currenttime]);
        console.log(currenttime);
      });
    }
  }, [userid]);

  return (
    <React.Fragment>
      {valid === true ? (
        <Container maxWidth="xl" disableGutters>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid container item xl={4} lg={4}></Grid>
            <Grid container item xl={8} lg={8}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={"Room : " + room}
                  subheader={"User : " + name}
                />
              </Card>
              <Grid item xs={12} xm={12} sm={12} md={12} lg={12} xl={12}>
                <ScrollToBottom className={ROOT_CSS}>
                  <Grid item xs={12} xm={12} sm={12} md={12} lg={12} xl={12}>
                    {messages.map((message, i) => (
                      <Grid key={i}>
                        {senders[i]} {message} {time[i]}
                      </Grid>
                    ))}
                  </Grid>
                </ScrollToBottom>
              </Grid>
              <Grid item xs={12} xm={12} sm={12} md={12} lg={12} xl={12}>
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    id="textinput"
                    name="text"
                    fullWidth="true"
                    autoComplete="off"
                    placeholder="Write a message here..."
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ) : connected === true ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
}
export default ChatBox;
