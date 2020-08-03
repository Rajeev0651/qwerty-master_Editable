const token = require("../models/models.tokens");
const express = require("express");
const operation = require("../models/Contents/FeedAlgorithm");
const router = express.Router();

router.get("/feedrequest", (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://localhost:3000/");
  res.set("Access-Control-Allow-Credentials", "true");
  console.log("Getting request...");
  if (req.cookies.token) {
    token.find({ token: req.cookies.token }, async (err, document) => {
      if (err) return console.log(err);
      if (document.length > 0) {
        let upperbound = 3;
        let lowerbound = 1;
        var ob;
        ob = await operation.LatestAlgorithm(upperbound, lowerbound);
        console.log(ob, "feedreq");
        res.send({ first: "first", second: "second", third: "third", jump: 3 });
      } else {
        res.send({ user: "invalid" });
      }
    });
  } else {
    res.send({ user: "invalid" });
  }
});

module.exports = router;
