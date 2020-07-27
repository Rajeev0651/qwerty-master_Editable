import React from "react";
import "./Trending.css";
function Trending() {
  return (
    <div className="Trending" className="card" style={{ marginRight: "0px", position: "fixed" }}>
      <img></img>
      <nav className="nav flex-column" style={{ marginRight: "0px" }}>
        <div className="card-body">
          <h5 className="card-title">Trending</h5>
          <p className="card-text">See what's happening around !!</p>
        </div>
        <ul className="list-group list-group-flush" className="card-body">
          <li className="list-group-item">
            <a href="#" className="card-link">
              Google
            </a>
            <div style={{ marginLeft: "4px" }}>1.2M</div>
          </li>
          <li className="list-group-item">
            <a href="#" className="card-link">
              Twitter Hacked
            </a>
            <div style={{ marginLeft: "4px" }}>1.1M</div>
          </li>
          <li className="list-group-item">
            <a href="#" className="card-link">
              Modi Wave
            </a>
            <div style={{ marginLeft: "4px" }}>1M</div>
          </li>
          <li className="list-group-item">
            <a href="#" className="card-link">
              StartUps
            </a>
            <div style={{ marginLeft: "4px" }}>900K</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Trending;
