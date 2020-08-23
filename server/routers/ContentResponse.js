const express = require("express");
const tokenoperation = require("../TokenManagement/VerifyToken");
const router = express.Router();
const redis = require("../Redis/CRUD");

router.post("/contentresponse", async (req, res) => {
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
        const likes = req.body.likes;
        const contentid = req.body.contentid;
        if (likes === true) {
          redis.RedisContentUpdate(contentid, 0, 1, 0);
        }
        const response = {
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
