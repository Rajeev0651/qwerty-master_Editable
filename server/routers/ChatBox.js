const express = require("express");
const user = require("../models/models.users");
const router = express.Router();

router.get("/chatbox", (req, res) => {
  if (req.cookies.token) {
    console.log(req.cookies.token);
    user.find({ token: req.cookies.token }, async (err, document) => {
      if (document.length != 0) {
        const response = {
          Name: "Rajeev Singh",
          res: "success",
        };
        res.send(response);
      } else {
        res.sendStatus(200);
      }
    });
  }
});

module.exports = router;
