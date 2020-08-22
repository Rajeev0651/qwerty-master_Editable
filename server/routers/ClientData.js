const express = require("express");
const router = express.Router();
const tokenoperation = require("../TokenManagement/VerifyToken");
const payloadoperation = require("../TokenManagement/GetPayload");
const user = require("../models/models.users");

router.get("/clientdata", async (req, res) => {
  console.log("Getting client data request...");
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
        var UserId = decoded.payload.id;
        user.find({ userId: UserId }, async (err, document) => {
          if (document.length != 0) {
            userid = decoded.payload.id
            username = decoded.payload.name
            const response = {
              Name : username,
              Id : userid,
              message: "Content Created",
            };
            res.send(response);
          }
        });
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