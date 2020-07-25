import React from "react";
import "./Heading.css";
const Heading = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand">
    StartUp 
  </a>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link">
          Home <span className="sr-only">(current)</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link">
          Features
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link">
          Careers
        </a>
      </li>
    </ul>
    </nav>
);

export default Heading;
