import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import ChatBox from "../Home/ChatBox/ChatBox";
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
        console.log(data)
        data.status !== "ok" && SetValid(false);
      });
  }, []);
  return (
    <React.Fragment>
      {valid === false ? <Redirect to={{ pathname: "/" }} /> : null}
      <Header />
      <Switch>
      <Route path={`${match.path}/chat`} component={ChatBox} exact={true} />
      </Switch>
      {console.log(match.path)}
    </React.Fragment>
  );
};

export default Home;
