const index = require("../models/models.index");
const contentSchema = require("../models/models.contents");
const { use } = require("../routers/signup");

function indexing(userID, field, value) {
  return new Promise((resolve) => {
    var ob;
    resolve(
      index.findOneAndUpdate(
        { UserID: userID },
        { $set: { [field]: value } },
        { upsert: true, new: true },
        (err, doc) => {
          console.log(field, "Updated !!");
          ob = doc.id;
          return ob;
        }
      )
    );
  });
}
function createIndexing(userID) {
  return new Promise((resolve) => {
    var CreateUserIndex = new index({
      UserID: userID,
    });
    CreateUserIndex.save(function (err, userdoc) {
      if (err) return console.error(err);
      resolve(console.log("User Index created !!"));
    });
  });
}
function CreateUserContent(userdata) {
  return new Promise((resolve) => {
    var ob;
    var Content = new contentSchema({
      userId: userdata.userId,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
    });
    Content.save((err, ContentDoc) => {
      if (err) return console.log(err);
      console.log("Content initialized successfully !!!");
      resolve((ob = ContentDoc.id));
    });
  });
}
module.exports = {
  indexing,
  createIndexing,
  CreateUserContent,
};
