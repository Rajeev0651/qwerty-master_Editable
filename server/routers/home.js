const token = require("../models/models.tokens");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://localhost:3000");
  res.set("Access-Control-Allow-Credentials", "true");
  if (req.cookies.token) {
    token.find({ token: req.cookies.token }, (err, document) => {
      document.length > 0
        ? res.send({ user: "authenticated" })
        : res.send({ user: "invalid" });
    });
    return;
  } else {
    res.send({ user: "invalid" });
  }
});

module.exports = router;
