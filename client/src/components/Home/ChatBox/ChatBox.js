import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import io from "socket.io-client";
import { Avatar, Box, Container, Card } from "@material-ui/core";
import Messages from "./messages/messages";
import Input from "../ChatBox/Input/input.js";
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useLocation, Redirect } from "react-router-dom";

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
  const classes = useStyles();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [route, setRoute] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://localhost:5000";
  socket = io(ENDPOINT);
  useEffect(() => {
    fetch("https://localhost:5000/chatbox", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(location.state);
        if (data.res == "success") {
          setName(location.state.Name);
          setRoom(location.state.Room);
          socket.emit("join", { name: "Rajeev", room: "Room1" }, (error) => {
            console.log(name, room, "Joining !!");
            if (error) {
              alert(error);
            }
          });
        } else {
          setRoute(false);
        }
      });
  }, ENDPOINT);

  useEffect(() => {
    socket.on('message.sent', (data)=>{
      setMessages(data);
    })
  }, []);

  const sendMessage = (event)=>
  {
    event.preventDefault();
    if(message)
    {
      socket.emit('message.send',{
        message: message,
        username: "Rajeev"
      })
    }
  }

  return (
    <React.Fragment>
      {route === false ? <Redirect to={{ pathname: "/" }} /> : null}
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
                title={room}
                subheader="Viewing"
              />
            </Card>
            <Widget />
          </Grid>
          <Grid container item xl={0} lg={0}></Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
export default ChatBox;
