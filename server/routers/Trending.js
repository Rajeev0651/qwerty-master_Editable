const express = require("express");
const tokenoperation = require("../TokenManagement/VerifyToken");
const router = express.Router();
const redis = require("../Redis/CRUD");
const FeedContent = require("../models/Contents/FeedContents");

async function RetriveContentById(ids) {
  return new Promise(async (resolve) => {
    console.log(ids[0], ids[1], ids[2], ids[3]);
    await FeedContent.find()
      .where("contentId")
      .in(ids)
      .exec((err, doc) => {
        console.log(doc, "res");
        let head = [];
        for (let i = 0; i < doc.length; i++) {
          ids[i * 2] = doc[i].content[0].heading;
        }
        resolve(ids);
      });
  });
}

router.get("/trending", async (req, res) => {
  console.log("Trending request...");
  var Validity = false;
  const access = req.cookies.ATC;
  const refresh = req.cookies.RTC;
  if (access == undefined || refresh == undefined) {
    const response = {
      status: "invalid",
      message: "Token not present",
    };
    res.send(response);
  } else {
    try {
      Validity = await tokenoperation.AccessAndRefreshToken(refresh, access);
      if (Validity == true) {
        trennding_data = await redis.RedisGetTopContentEngagement();
        console.log("Trending Data", trennding_data);
        var trend = [];
        if (trennding_data.length > 0) {
          trend = await RetriveContentById(trennding_data);
          console.log(trend[0], trend[1], trend[2], trend[3]);
        }
        const response = {
          content: trend,
          status: "ok",
          message: "Access Granted ",
        };
        res.send(response);
      } else {
        const response = {
          status: "invalid",
          message: "Access decline",
        };
        res.send(response);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
