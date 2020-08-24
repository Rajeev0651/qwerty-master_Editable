const contentdetails = require("./model.AllContent");
const FeedContent = require("../Contents/FeedContents");
const redis = require("../../Redis/CRUD");
const content = require("../models.contents");

async function RetriveContent(doc) {
  return new Promise(async (resolve) => {
    var ids = [];
    for (i = 0; i < doc.length; i++) {
      ids[i] = doc[i].contentid;
    }
    console.log(ids);
    await FeedContent.find()
      .where("contentId")
      .in(ids)
      .exec((err, doc) => {
        console.log(doc, "res");
        resolve(doc);
      });
  });
}
async function RetriveContentById(ids) {
  return new Promise(async (resolve) => {
    await FeedContent.find()
      .where("contentId")
      .in(ids)
      .exec((err, doc) => {
        console.log(doc, "res");
        let temp = [];
        for (let i = 0; i < doc.length; i++) {
          for (let j = 0; j < doc.length; j++) {
            if (ids[i] === doc[j].contentId) {
              temp.push(doc[j]);
              break;
            }
          }
        }
        resolve(temp);
      });
  });
}
function LatestAlgorithm(upperbound, lowerbound) {
  return new Promise((resolve) => {
    var Contents;
    console.log(upperbound, lowerbound);
    contentdetails
      .find({ bylatest: { $lte: upperbound, $gte: lowerbound } })
      .exec(async (err, doc) => {
        if (err) return console.log(err);
        Contents = await RetriveContent(doc);
        resolve(Contents);
      });
  });
}
function LikesAlgorithm(upperbound, lowerbound) {
  return new Promise(async (resolve) => {
    let contentid = await redis.RedisContentIdSend(upperbound, lowerbound);
    console.log("Content ID : ", contentid);
    let content = await RetriveContentById(contentid);
    resolve(content);
  });
}
module.exports = { LatestAlgorithm, LikesAlgorithm };
