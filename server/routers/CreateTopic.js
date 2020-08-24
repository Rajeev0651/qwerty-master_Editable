const express = require("express");
const router = express.Router();
const user = require("../models/models.users");
const dotenv = require("dotenv");
const contents = require("../models/models.contents");
const FeedContent = require("../models/Contents/FeedContents");
const operation = require("../models/Contents/ContentsOperations");
const tokenoperation = require("../TokenManagement/VerifyToken");
const payloadoperation = require("../TokenManagement/GetPayload");
const crud = require("../Redis/CRUD");

dotenv.config();

function addDocument(userdoc, data) {
  console.log(userdoc[0].userId);
  return new Promise((resolve) => {
    var obt;
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
        obt = doc.content[doc.content.length - 1].id;
        console.log(doc.content.length, "LLLLLLLLLLLLL");
        await operation.descriptions(
          userdoc[0].userId,
          doc.content[doc.content.length - 1].id,
          doc.content.length
        );
        CreateFeedContent(userdoc, data, obt);
        resolve(obt);
      }
    );
  });
}

function CreateFeedContent(user, contentdata, ids) {
  var Feed = new FeedContent({
    userId: user[0].userId,
    firstName: user[0].firstName,
    contentId: ids,
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

router.post("/home/CreateTopic", async (req, res) => {
  console.log("Getting Create request...");
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
        var UserId = decoded.payload.id;
        user.find({ userId: UserId }, async (err, document) => {
          if (document.length != 0) {
            contentid = await addDocument(document, req.body);
            console.log(contentid, "Content ID");
            userid = decoded.payload.id;
            username = decoded.payload.name;
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes();
            crud.RedisAddContent(
              contentid,
              userid,
              username,
              time,
              "Space",
              userid
            );
            const response = {
              status: "ok",
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
