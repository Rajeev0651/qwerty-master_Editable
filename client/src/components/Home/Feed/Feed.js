import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./image.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Trending from "../Trending/Trending";
import RightBar from "../RightBar/RightBar";
import { Paper, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Feed.css";
import { Redirect, useRouteMatch } from "react-router-dom";

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
}));

let post = {
  xl: 6,
  lg: 6,
  md: 3,
  sm: 0,
  xm: 0,
};

function Feed() {
  const classes = useStyles();
  const [route, setRoute] = useState(false);
  const [lb, setLower] = useState(1);
  const [postID, setPostID] = useState([1]);
  const [roomID, setRoomID] = useState([1]);
  const [user, setUser] = useState("");
  const [userID, setUserId] = useState("");
  const [room, setRoom] = useState("");

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
          console.log(data[0].firstName)
          setUser(data[0].firstName);
          setUserId(data[0].userId);
          for (let i = 0; i < len; i++) {
            setPostID((postID) => [...postID, data[i].content[0].heading]);
            setRoomID((roomID) => [...roomID, data[i].contentId]);
          }
          if (len >= 1) console.log(data[0].content[0].heading);
          setLower(lb + len);
        }
      });
  }, []);

  const handleClick = (i) => {
    setRoom(roomID[i]);
    setRoute(true);
    console.log("RoomID : ", i, roomID[i]);
  };

  function fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in .5 secs
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
          setPostID((postID) => [...postID, data[i].content[0].heading]);
          setRoomID((roomID) => [...roomID, data[i].contentId]);
        }
        setLower(lb + len);
      });
  }
  return (
    <React.Fragment>
      {route && (
        <Redirect
          to={{
            pathname: "home/chat",
            state: { Name: user, Room: room, UserId: userID },
          }}
        />
      )}
      <Container maxWidth="xl" disableGutters>
        <Grid container spacing={0}>
          <Grid
            item
            xs={false}
            xm={0}
            sm={0}
            md={3}
            lg={3}
            xl={3}
            className="trendingShrink"
          >
            <Paper className={classes.paper}>
              <Trending />
            </Paper>
          </Grid>
          <Grid
            item
            xs={false}
            xm={post.xm}
            sm={post.sm}
            md={post.md}
            lg={post.lg}
            xl={post.xl}
          >
            <InfiniteScroll
              dataLength={postID.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              {postID.map((i, index) => (
                <Paper className={classes.paper}>
                  <Card>
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
                      title={i}
                      subheader="September 14, 2016"
                    />
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
                        <Button>Like</Button>
                        <Button onClick={() => handleClick(index)}>Join</Button>
                        <Button>Share</Button>
                      </ButtonGroup>
                    </CardContent>
                  </Card>
                </Paper>
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
            <Paper className={classes.paper}>
              <RightBar />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
export default Feed;
