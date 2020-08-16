var redisJson = require("redis-store-json");
const data = require("../Redis/data");
var client = data.key[0];

function Add(ContentID) {
  var client = data.key[0];
  redisJson.use(client);
  let testSet = {
    no_of_users: "5",
    no_of_likes: "2",
    messageid: ContentID + "_message",
    userid: ContentID + "_user",
  };

  redisJson
    .set(ContentID, testSet)
    .then(() => {
      console.log("Redis inserted JSON");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  redisJson.getJSON(ContentID).then((data) => {
    console.log(data);
  });
}
function AddMessage(ContentID, UserID, msg, time) {
  var client = data.key[0];
  redisJson.use(client);
  let msgdata = {
    message: msg,
    userid: UserID,
    time: time,
  };
  redisJson
    .set(ContentID + "_message", msgdata)
    .then(() => {
      console.log("Redis inserted JSON");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  redisJson.getJSON(ContentID + "_message").then((data) => {
    console.log(data);
  });
}
function AddUsers(ContentID, userid) {
  var client = data.key[0];
  console.log("User Added to socket room...");
  client.LPUSH(ContentID + "_user", userid);
  client.LLEN(ContentID + "_user", (err, data) => {
    for (var i = 0; i < data; i++) {
      client.LINDEX(ContentID + "_user", i, (err, data) => {
        //console.log(data);
      });
    }
  });
}
function CheckUser(ContentID, userid) {
  var client = data.key[0];
  var res = false;
  client.LLEN(ContentID + "_user", (err, data) => {
    for (var i = 0; i < data; i++) {
      client.LINDEX(ContentID + "_user", i, (err, data) => {
        if (data == userid) {
          res = true;
          break;
        }
      });
    }
  });
  return res;
}
function FetchMessages(ContentID) {
  var messages = [];
  client.LLEN(ContentID + "_message", (err, len) => {
    for (var i = 0; i < len; i++) {
      client.LINDEX(ContentID + "_message", i, (err, message) => {
        messages.push(message);
      });
    }
  });
  return messages;
}
module.exports = { Add, AddMessage, AddUsers, CheckUser, FetchMessages };
