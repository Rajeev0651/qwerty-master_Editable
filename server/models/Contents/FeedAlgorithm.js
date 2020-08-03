const contentdetails = require("./model.AllContent");
const FeedContent = require("../Contents/FeedContents");

async function RetriveContent(doc) {
  var ids = [];
  for (i = 0; i < doc.length; i++) {
    ids[i] = doc[i].contentid;
  }
  console.log(ids);
  await FeedContent.find()
    .where("_id")
    .in(ids)
    .exec((err, doc) => {
      console.log(doc, "res");
    });
  console.log("XXX")  
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
        resolve((ob = doc));
        return ob;
      });
  });
}
module.exports = { LatestAlgorithm };
