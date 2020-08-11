import React, { useState } from "react";
import "./Header.css";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NavLink, Redirect } from "react-router-dom";
import Trending from "../Trending/Trending";
import Feed from "../Feed/Feed";
import Notifications from "../Notifications/Notifications";
import Messages from "../Messages/Messages";
import Profile from "../Profile/Profile";
import CreateTopic from "../CreateTopic/CreateTopic";
import Error404 from "../../Error404/Error404";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    maxHeight: "50px",
  },
  toolbar: {
    flexWrap: "wrap",
    marginTop: "0px",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    marginLeft: "50px",
  },
}));

function Header() {
  const classes = useStyles();
  let match = useRouteMatch();
  const [route, setRoute] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    fetch("https://localhost:5000/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRoute(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      {route && <Redirect to={{ pathname: "/" }} />}
      <CssBaseline />
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Company name
          </Typography>
          <nav>
            <Link
              //component={RouterLink}
              variant="button"
              color="textPrimary"
              href="/"
              className={classes.link}
            >
              Feed
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to={"/home/notifications"}
              className={classes.link}
            >
              Notification
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to={"/home/messages"}
              className={classes.link}
            >
              Messages
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to={"/home/profile"}
              className={classes.link}
            >
              Profile
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to={"/home/createtopic"}
              className={classes.link}
              style={{ marginRight: "300px" }}
            >
              Create Topic
            </Link>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Logout
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path={`${match.path}`} component={Feed} exact={true} />
        <Route path={`${match.path}/notifications`} component={Notifications} />
        <Route path={`${match.path}/messages`} component={Messages} />
        <Route path={`${match.path}/profile`} component={Profile} />
        <Route path={`${match.path}/createtopic`} component={CreateTopic} />
      </Switch>
    </React.Fragment>
  );
}

export default Header;
