const express = require("express");
const operation = require("../models/Contents/FeedAlgorithm");
const payloadoperation = require("../TokenManagement/GetPayload");
const tokenoperation = require("../TokenManagement/VerifyToken");
const router = express.Router();

router.get("/feedrequest", async (req, res) => {
  console.log("Getting Feed request...");
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
      var decoded = await payloadoperation.payload(access);
      if (Validity == true) {
        let lowerbound = req.query.batch;
        console.log(lowerbound);
        ob = await operation.LatestAlgorithm(
          parseInt(lowerbound) + 2,
          parseInt(lowerbound)
        );
        Data = {
          Name : decoded.payload.name,
          Id : decoded.payload.id
        }
        console.log(Data, "feedreq");
        res.send(ob);
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
