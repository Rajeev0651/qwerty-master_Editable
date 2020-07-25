const express = require("express");
const router = express.Router();
const user = require("../models/models.users");
const dotenv = require("dotenv");
const token = require("../models/models.tokens");
const content = require("../models/models.contents");
dotenv.config();

const addDocument = (doc, contents) => {
  console.log(doc);
  var addContent = new content({
    firstName: doc[0].firstName,
    lastName: doc[0].lastName,
    heading: contents.Heading,
    description: contents.Descriptions,
    userId: doc[0].userId,
  });
  addContent.save(function (err, userdoc) {
    if (err) return console.error(err);
    console.log("saved to user collection.");
  });
};
router.post("/home/CreateTopic", (req, res) => {
  tokens = req.headers.token.substring(6);
  console.log(tokens);
  console.log(req.body);
  res.set("Access-Control-Allow-Origin", "https://localhost:3000");
  res.set("Access-Control-Allow-Credentials", "true");
  if (req.headers.token) {
    console.log("Header present");
    user.find({ token: tokens }, (err, document) => {
      console.log(document);
      if (document.length != 0) {
        console.log("present");
        var data = user.find({ token: tokens });
        addDocument(document, req.body);
      } else {
        res.send("Token invalid");
      }
    });
  } else {
    res.send({ user: "Token not present" });
  }
});
module.exports = router;
