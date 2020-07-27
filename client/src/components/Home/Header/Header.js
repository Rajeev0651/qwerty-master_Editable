import React, { useState } from "react";
import "./Header.css";
import { NavLink, Redirect } from "react-router-dom";
function Header() {
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
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setRoute(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav className="container-fluid navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      {route && <Redirect to={{ pathname: "/" }} />}
      <NavLink to="#" className="navbar-brand">
        StartUp
      </NavLink>
      {route && <Redirect to={{ pathname: "/" }} />}
      <div style={{ marginLeft: "320px" }}>
        <ul className="navbar-nav ml-auto mr-auto justify-content-center">
          <li className="nav-item active">
            <NavLink
              to={`/home`}
              className="nav-link"
              activeClassName="nav-item"
            >
              Feed
            </NavLink>
          </li>
          <li className="nav-item active" style={{ marginLeft: "25px" }}>
            <NavLink
              to={`/home/notifications`}
              className="nav-link"
              activeClassName="nav-item"
            >
              Notifications
            </NavLink>
          </li>
          <li className="nav-item active" style={{ marginLeft: "25px" }}>
            <NavLink to={`/home/messages`} className="nav-link">
              Messages
            </NavLink>
          </li>
          <li className="nav-item active" style={{ marginLeft: "25px" }}>
            <NavLink to={`/home/profile`} className="nav-link">
              Profile
            </NavLink>
          </li>
          <li className="nav-item active" style={{ marginLeft: "25px" }}>
            <NavLink to={`/home/createtopic`} className="nav-link">
              Create Topic
            </NavLink>
          </li>
        </ul>
      </div>
      <form
        className="form-inline my-2 my-lg-0"
        onSubmit={(e) => e.preventDefault()}
        style={{ marginLeft: "134px" }}
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
      <div className="logoutbtn" style={{ marginLeft: "52px" }}>
        <button className="btn btn-primary mr-5" onClick={handleClick}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
