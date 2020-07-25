import React from "react";
import Image from "./adds.jpg";
import "./RightBar.css";
function RightBar() {
  return (
    <div className="RightBar card" style={{ width: "18rem" }}>
      <img src={Image} height="40%" width="40%"></img>
      <div className="card-body">
        <p className="card-text">Advertisement</p>
      </div>
    </div>
  );
}

export default RightBar;
