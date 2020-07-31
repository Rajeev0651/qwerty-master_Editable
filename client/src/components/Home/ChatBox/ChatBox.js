import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import io from "socket.io-client";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
import { Avatar, Box, Container, Card } from "@material-ui/core";
import Messages from "./messages/messages";
import Input from "../ChatBox/Input/input.js";
import ProfileImage from "./rajeev.PNG";
import {useLocation, Redirect} from 'react-router-dom'

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
  let location = useLocation()
  const classes = useStyles();
  const [route, setRoute] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const ROOT_CSS = css({
    height: 500,
    width: 1000,
  });

  let ChatData = [
    "Ajhfkevednvifeefe",
    "Befneknfk",
    "Cefejagng",
    "Deaheiafe",
    "Eehfae3f 3r3 fe",
  ];

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://localhost:5000";

  useEffect(() => {
    console.log(location.state)
    let name = location.state.Name
    let room = location.state.Room;
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(messages);

  return (
    <React.Fragment>
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
            <Container disableGutters>
              <Messages messages={messages} name={name} />
              <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </Container>
          </Grid>
          <Grid container item xl={0} lg={0}></Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
export default ChatBox;
