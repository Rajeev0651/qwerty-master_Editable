const express = require("express");
const user = require("../models/models.users");
const router = express.Router();
const tokenoperation = require("../TokenManagement/VerifyToken");
const payloadoperation = require("../TokenManagement/GetPayload");

router.get("/chatbox", async (req, res) => {
  var ids;
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
        var decoded = await payloadoperation.payload(access);
        var Name = decoded.payload.name;
        const response = {
          Name: Name,
          status: "invalid",
          message: "Access decline",
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
      res.sendStatus(500);
    }
  }
});

module.exports = router;
