var redisJson = require("redis-store-json");
const data = require("../Redis/data");

/****************************** Adding New Content Field ************************************* */
async function RedisAddContent(
  ContentID,
  AdminId,
  AdminName,
  CreatedAt,
  Space,
  Moderators
) {
  /***** Variables */
  var client = data.key[0];
  redisJson.use(client);
  let Content_Data_Obj = {
    admin_id: AdminId,
    admin_name: AdminName,
    created_at: CreatedAt,
    space: Space,
    mod: Moderators,
    no_of_hits: 0,
    no_of_likes: 0,
    no_of_shares: 0,
    message_id: ContentID + "_messages",
    user_id: ContentID + "_users",
  };
  /***** Set */
  await redisJson
    .set(ContentID, Content_Data_Obj)
    .then(() => {
      console.log("Redis Content created for :", ContentID);
    })
    .catch((err) => {
      console.log("Redis Error on Content Creation: ", err);
    });
  /***** Get */
  await redisJson
    .getJSON(ContentID)
    .then((Content_data) => {
      console.log("Redis Content Data : ", Content_data);
    })
    .catch((err) => {
      console.log("Redis Content Output Error : ", err);
    });
  RedisAddMessage(false, ContentID, AdminId, AdminName, "Welcome", CreatedAt);
  RedisAddUsers(false, ContentID, AdminId, AdminName);
}
/****************************** Adding each Message on a Content_Messages Field ********************* */
async function RedisAddMessage(
  update,
  ContentID,
  UserID,
  UserName,
  Message,
  Time
) {
  /***** Variables */
  var client = data.key[0];
  redisJson.use(client);
  let Message_Data_Obj = {
    user_id: [],
    user_name: [],
    message: [],
    time: [],
  };
  if (update == false) {
    /***** Set */
    redisJson
      .set(ContentID + "_messages", Message_Data_Obj)
      .then(() => {
        console.log("Redis message inserted : ", Message);
      })
      .catch((err) => {
        console.log("Redis Error on message insertion : ", err);
      });
  } else {
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "user_id")
      .then((data) => {
        data = data.push(UserID);
        redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "user_id", data)
          .then(() => {})
          .catch((err) => {
            console.error(err); //error when modifing error
          });
      })
      .catch((err) => {
        console.error(err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "user_name")
      .then((data) => {
        data = data.push(UserName);
        redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "user_name", data)
          .then(() => {})
          .catch((err) => {
            console.error(err); //error when modifing error
          });
      })
      .catch((err) => {
        console.error(err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "message")
      .then((data) => {
        data = data.push(Message);
        redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "message", data)
          .then(() => {})
          .catch((err) => {
            console.error(err); //error when modifing error
          });
      })
      .catch((err) => {
        console.error(err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "time")
      .then((data) => {
        data = data.push(Time);
        redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "time", data)
          .then(() => {})
          .catch((err) => {
            console.error(err); //error when modifing error
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  /***** Get */
  redisJson.getJSON(ContentID + "_messages").then((data) => {
    console.log("Redis all messages in a ContentID : ", data);
  });
}
/****************************** Adding users to Content ****************************************** */
async function RedisAddUsers(Update, ContentID, UserID, UserName) {
  /***** Variable */
  var client = data.key[0];
  redisJson.use(client);
  let User_Data_Obj = {
    user_id: [],
    user_name: [],
  };
  if (Update == false) {
    /** Operation */
    redisJson
      .set(ContentID + "_users", User_Data_Obj)
      .then(() => {
        console.log("Redis User Added to socket room...");
      })
      .catch((err) => {
        console.log("Redis Error on room insertion : ", err);
      });
  } else {
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_users", "user_name")
      .then((data) => {
        data = data.push(UserName);
        redisJson
          .modifyValueByJsonKey(ContentID + "_users", "user_name", data)
          .then(() => {})
          .catch((err) => {
            console.error(err); //error when modifing error
          });
      })
      .catch((err) => {
        console.error(err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_users", "user_id")
      .then((data) => {
        data = data.push(UserID);
        redisJson
          .modifyValueByJsonKey(ContentID + "_users", "user_id", data)
          .then(() => {})
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
/****************************** Check if Users visited in a Content ************************** */
function RedisCheckUser(ContentID, userid) {
  /***** Variable */
  var client = data.key[0];
  redisJson.use(client);
  var res = false;
  /***** Get */

  /***** Return  */
  return res;
}
/************************** Getting all stored messages in a Content ******************* */
function RedisFetchMessages(ContentID) {
  /***** Variable */
  var client = data.key[0];
  redisJson.use(client);
  var messages;
  /***** Get */
  redisJson
    .getJSON(ContentID + "_messages")
    .then((data) => {
      console.log(data);
      messages = data;
    })
    .catch((err) => {
      console.log(err);
    });
  /***** Return  */
  return messages;
}
/****************************** Clearing All Redis Databases ****************************************** */
function RedisFlush() {
  var client = data.key[0];
  redisJson.use(client);
  client.flushall();
}
module.exports = {
  RedisAddContent,
  RedisAddMessage,
  RedisAddUsers,
  RedisCheckUser,
  RedisFetchMessages,
  RedisFlush,
};
