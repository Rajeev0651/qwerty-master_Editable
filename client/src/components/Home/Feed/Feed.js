import React from "react";
import Image from "./God.jpg";
import "./Feed.css";
function Feed() {
  function handlclick(e) {
    var trend = document.querySelector(".nav");
    trend.style.display = "none";
    var rightbar = document.querySelector(".RightBar");
    rightbar.style.width = "800px";
    document.querySelector("#show").style.display = "flex";
  }
  return (
    <div className="Topic">
      <div className="card text-center">
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">OM Shiv</p>
          <img src={Image} className="img-fluid"></img>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
      <div className="TopicAction">
        <button className="btn btn-primary" onClick={handlclick}>
          Join/LeaveView
        </button>
      </div>
    </div>
  );
}

export default Feed;
