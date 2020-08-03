const contentdetails = require("./model.AllContent");

function descriptions(userid, contentid, count) {
  return new Promise((resolve) => {
    var Content = new contentdetails({
      userId: userid,
      contentid: contentid,
      bylatest: count,
    });
    Content.save((err, ContentDoc) => {
      if (err) return console.log(err);
      console.log(ContentDoc);
      resolve(console.log("Content desc inserted !!!"));
    });
  });
}
module.exports = { descriptions };
