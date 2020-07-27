import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import RightBar from "./RightBar/RightBar";
import Trending from "./Trending/Trending";
import Feed from "./Feed/Feed";
import Notifications from "./Notifications/Notifications";
import Messages from "./Messages/Messages";
import Profile from "./Profile/Profile";
import CreateTopic from "./CreateTopic/CreateTopic";
import Error404 from "../Error404/Error404";
import "./Home.css";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";

const Home = () => {
  let match = useRouteMatch();
  const [valid, SetValid] = useState(true);
  useEffect(() => {
    fetch("https://localhost:5000", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        data.user !== "authenticated" && SetValid(false);
      });
  }, []);
  function handleclick(e) {
    document.querySelector(".TrendingStyle").style.display = "flex";
    document.querySelector("#show").style.display = "none";
    var rightbar = document.querySelector(".RightBarStyle");
    rightbar.style.className = "col-sm-3";
  }
  return (
    <div>
      {valid === false ? <Redirect to={{ pathname: "/" }} /> : null}
      <Header />
      <div className="container-fluid" style={{ overflow: "hidden" }}>
        <div className="row content">
          <div className="TrendingStyle col-sm-3" style={{ marginTop: "48px" }}>
            <Trending />
          </div>
          <div className="FeedStyle col-sm-6" style={{ marginTop: "48px" }}>
            <Switch>
              <Route path={`${match.path}`} component={Feed} exact={true} />
              <Route
                path={`${match.path}/notifications`}
                component={Notifications}
              />
              <Route path={`${match.path}/messages`} component={Messages} />
              <Route path={`${match.path}/profile`} component={Profile} />
              <Route
                path={`${match.path}/createtopic`}
                component={CreateTopic}
              />
              <Route component={Error404} />
            </Switch>
          </div>
          <div className="RightBarStyle col-sm-3" style={{ marginTop: "48px" }}>
            <RightBar />
          </div>
          <div className="ChatBoxes fixed" style={{ backgroundColor:"yellow" ,maxHeight: "658px", marginTop: "48px"}}>
            click me to see trending click me to see trending click me to see
            trending click me to see trending click me to see trending click me
            to see trending click me to see trending click me to see trending
            click me to see trending
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
