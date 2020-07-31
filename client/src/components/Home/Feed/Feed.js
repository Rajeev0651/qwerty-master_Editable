import React, { useState } from "react";
import ChatBox from "../ChatBox/ChatBox";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./image.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Trending from "../Trending/Trending";
import RightBar from "../RightBar/RightBar";
import Chat from "../Feed/Feed"
import { Paper, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Feed.css";
import { Route, Switch,Redirect, useRouteMatch } from "react-router-dom";

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
let chat = {
  xl: 0,
  lg: 0,
  md: 0,
  sm: 0,
  xm: 0,
};

function Feed() {
  const classes = useStyles();
  let match = useRouteMatch();
  const [route, setRoute] = useState(false);
  const [items, setItems] = useState(Array.from({ length: 2 }));
  const [postID, setPostID] = useState(Array.from({ length: 2 }))
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  function fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems((items) => [...items, 1, 2, 3]);
      setPostID((postID)=> [...postID, "User1", "User2", "User3"])
    }, 1000);
  }

  const handleClick = (Post) => {
    // e.preventDefault();
    // fetch("https://localhost:5000/", {
    //   method: "GET",
    //   mode: "cors",
    //   credentials: "include",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     document.cookie =
    //       "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(Post)
        console.log(Post,"PPPPPPPPPPPPPPP")
        setRoom("1")
        setRoute(true);
      //})
     // .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
       {route && <Redirect to={{ pathname: "home/chat", state:{Name: user, Room: room} }} />}
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
                        <Button onClick={()=>handleClick(i)}>Join</Button>
                        {console.log(i, "XXX")}
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
