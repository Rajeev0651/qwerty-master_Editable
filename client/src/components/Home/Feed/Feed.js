import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./God.jpg";
import "./Feed.css";
function Feed() {
  const [items, setItems] = useState(Array.from({ length: 5 }));
  function fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems((items) => [...items, 1, 2, 3]);
    }, 1000);
  }
  function handleClick(e) {
    var trend = document.querySelector(".TrendingStyle");
    trend.style.display = "none";
    var rightbar = document.querySelector(".RightBarStyle");
    rightbar.style.display = "none";
    var feed = document.querySelector(".FeedStyle");
    feed.className = "col-sm-4";
    var chatbox = document.querySelector(".ChatBoxes")
    chatbox.className = "col-sm-8";
  }
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map((i, index) => (
        <div className="card text-center" style={{ marginBottom: "40px" }}>
          <div className="card-header">
            <h5>Featured</h5>
          </div>
          <div className="card-body">
            <div className="card-title">Special title treatment</div>
            <img src={Image} alt="image"></img>
          </div>
          <div className="card-footer text-muted">2 days ago</div>
          <button className="btn btn-primary" onClick={handleClick}>
            Join Chat
          </button>
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default Feed;
