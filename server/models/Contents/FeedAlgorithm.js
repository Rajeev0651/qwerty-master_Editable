const contentdetails = require("./model.AllContent");
const FeedContent = require("../Contents/FeedContents");

async function RetriveContent(doc) {
  return new Promise(async(resolve) => {
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
          resolve(doc)
        })
  });
}

function LatestAlgorithm(upperbound, lowerbound) {
  return new Promise((resolve) => {
    var ob;
    console.log(upperbound, lowerbound);
    contentdetails
      .find({ bylatest: { $lte: upperbound, $gte: lowerbound } })
      .exec(async (err, doc) => {
        if (err) return console.log(err);
        ob = await RetriveContent(doc);
        console.log(ob, "RRRRRRRRRRRRRRRRRR")
        resolve(ob);
      });
  });
}
module.exports = { LatestAlgorithm };
