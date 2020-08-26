import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./image.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Trending from "../Trending/Trending";
import RightBar from "../RightBar/RightBar";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Feed.css";
import { Redirect } from "react-router-dom";
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
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
  avatar: {
    backgroundColor: red[500],
  },
  card:{
    width : "100%"
  }
}));

function Feed() {
  const classes = useStyles();
  const [route, setRoute] = useState(false);
  const [connected, SetConnected] = useState(false);
  const [lb, setLower] = useState(1);
  const [ContentHeading, setContentHeading] = useState([]);
  const [ContentDescription, setContentDescription] = useState([]);
  const [CreatedAt, setCreatedAt] = useState([]);
  const [roomID, setRoomID] = useState([]);
  const [user, setUser] = useState("");
  const [userID, setUserId] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    let url = "https://localhost:5000/clientdata";
    fetch(url, {
      method: "GET",
      mode: "cors",
      withCredentials: true,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        SetConnected(true);
        setUser(data.Name);
        setUserId(data.Id);
      });
  }, []);

  useEffect(() => {
    let url = "https://localhost:5000/feedrequest?batch=" + lb;
    fetch(url, {
      method: "GET",
      mode: "cors",
      withCredentials: true,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        var len = data.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            setContentHeading((ContentHeading) => [
              ...ContentHeading,
              data[i].content[0].heading,
            ]);
            setContentDescription((ContentDescription) => [
              ...ContentDescription,
              data[i].content[0].description,
            ]);
            setCreatedAt((CreatedAt) => [
              ...CreatedAt,
              data[i].content[0].createdAt,
            ]);
            setRoomID((roomID) => [...roomID, data[i].contentId]);
          }
          if (len >= 1) console.log(data[0].content[0].heading);
          setLower((lb) => lb + len);
        }
      });
  }, []);

  const handleClick = (i) => {
    setRoom(roomID[i]);
    setRoute(true);
    console.log("RoomID : ", i, roomID[i]);
  };

  const likes = (i) => {
    (async () => {
      const response = await axios({
        method: "post",
        url: "https://localhost:5000/contentresponse",
        mode: "cors",
        withCredentials: true,
        data: {
          likes: true,
          contentid: roomID[i],
        },
      });
    })();
  };

  function fetchMoreData() {
    let url = "https://localhost:5000/feedrequest?batch=" + lb;
    fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        var len = data.length;
        for (let i = 0; i < len; i++) {
          setContentHeading((ContentHeading) => [
            ...ContentHeading,
            data[i].content[0].heading,
          ]);
          setContentHeading((ContentHeading) => [
            ...ContentHeading,
            data[i].content[0].heading,
          ]);
          setContentDescription((ContentDescription) => [
            ...ContentDescription,
            data[i].content[0].description,
          ]);
          setCreatedAt((CreatedAt) => [
            ...CreatedAt,
            data[i].content[0].createdAt,
          ]);
          setRoomID((roomID) => [...roomID, data[i].contentId]);
        }
        setLower(lb + len);
      });
  }
  return (
    <React.Fragment>
      {route === true ? (
        <Redirect
          push
          to={{
            pathname: "home/chat",
            state: { Name: user, Room: room, UserId: userID },
          }}
        />
      ) : connected === true ? (
        <React.Fragment>
          <Container maxWidth="xl" disableGutters>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid
                item
                xs={false}
                xm={0}
                sm={0}
                md={3}
                lg={3}
                xl={3}
                className="trendingShrink"
                container
                spacing={1}
              >
                <Trending />
              </Grid>
              <Grid
                item
                xs={false}
                xm={6}
                sm={6}
                md={3}
                lg={0}
                xl={6}
              >
                <InfiniteScroll
                  dataLength={ContentHeading.length}
                  next={fetchMoreData}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                >
                  {ContentHeading.map((i, index) => (
                    <Card className="card">
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={i}
                        subheader="Time"
                      />
                      <Typography>{ContentDescription[index]}</Typography>
                      <CardMedia
                        className={classes.media}
                        image={Image}
                        title="Image"
                      />
                      <CardContent>
                        <ButtonGroup
                          size="large"
                          color="primary"
                          aria-label="large outlined primary button group"
                        >
                          <Button onClick={() => likes(index)}>Like</Button>
                          <Button onClick={() => handleClick(index)}>
                            Join
                          </Button>
                          <Button>Share</Button>
                        </ButtonGroup>
                      </CardContent>
                    </Card>
                  ))}
                </InfiniteScroll>
              </Grid>
              <Grid
                item
                xs={0}
                xm={0}
                sm={0}
                md={3}
                lg={3}
                xl={3}
                className="advertisementShrink"
                
              >
                <RightBar />
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
}
export default Feed;
