const express = require("express");
const router = express.Router();
const user = require("../models/models.users");
const dotenv = require("dotenv");
const token = require("../models/models.tokens");
const contents = require("../models/models.contents");
const FeedContent = require("../models/Contents/FeedContents");
const operation = require("../models/Contents/ContentsOperations");
const { Mongoose } = require("mongoose");
const content = require("../models/Contents/model.AllContent");

dotenv.config();

function addDocument(userdoc, data) {
  console.log(userdoc[0].userId);
  return new Promise((resolve) => {
    var ob;
    resolve(
      contents.findOneAndUpdate(
        { userId: userdoc[0].userId },
        {
          $push: {
            content: {
              heading: data.Heading,
              description: data.Descriptions,
            },
          },
        },
        { upsert: true, new: true },
        async (err, doc) => {
          console.log(doc, "Content inserted sccessfully !!");
          console.log();
          ob = doc.content[doc.content.length - 1].id;
          console.log(ob, "AAAAAAAAAa");
         await operation.descriptions(
            userdoc[0].userId,
            doc.content[doc.content.length - 1].id,
            doc.content.length
          );
          return ob
        }
      )
    );
  });
}

function CreateFeedContent(user, contentdata, id) {
  var Feed = new FeedContent({
    userId: user[0].userId,
    firstName: user[0].firstName,
    contentId: id,
    content: [
      {
        heading: contentdata.Heading,
        description: contentdata.Descriptions,
      },
    ],
  });
  Feed.save((err, ContentDoc) => {
    if (err) return console.log(err);
    console.log("Feed Contend saved successfully !!");
  });
}

router.post("/home/CreateTopic", (req, res) => {
  console.log("Getting content request !!");
  tokens = req.headers.token.substring(6);
  console.log(tokens);
  console.log(req.body);
  res.set("Access-Control-Allow-Origin", "https://localhost:3000");
  res.set("Access-Control-Allow-Credentials", "true");
  if (req.headers.token) {
    user.find({ token: tokens }, async (err, document) => {
      if (document.length != 0) {
        var ids = await addDocument(document, req.body);
        console.log(ids, "JJJJJJJJJJJ");
        CreateFeedContent(document, req.body, ids);
      } else {
        res.send("Token invalid");
      }
    });
  } else {
    res.send({ user: "Token not present" });
  }
});
module.exports = router;
