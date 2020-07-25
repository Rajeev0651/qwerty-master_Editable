import React from "react";
import "./Trending.css";
function Trending() {
  function handleclick(e) {
    document.querySelector(".nav").style.display = "flex";
    document.querySelector("#show").style.display = "none";
    var rightbar = document.querySelector(".RightBar");
    rightbar.style.width = "300px";
  }
  return (
    <div className="Trending" className="card" style={{ marginRight: "0px" }}>
      <img></img>
      <div id="show" className="trendingdisp">
        <button className="btn btn-danger" id="showtrend" onClick={handleclick}>
          click me to see trending
        </button>
      </div>
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
            <div style={{ marginLeft: "4px" }}>900KM</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Trending;
