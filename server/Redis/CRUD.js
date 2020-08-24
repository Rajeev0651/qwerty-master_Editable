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
  console.log(client);
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
    .set(ContentID + "_contentid", Content_Data_Obj)
    .then(async () => {
      await client.zadd("ClientIdLists", 0, ContentID);
      console.log("Redis Content created for :", ContentID);
    })
    .catch((err) => {
      console.log("Redis Error on Content Creation: ", err);
    });
  /***** Get */
  await redisJson
    .getJSON(ContentID + "_contentid")
    .then((Content_data) => {
      console.log("Redis Content Data : ", Content_data);
    })
    .catch((err) => {
      console.log("Redis Content Output Error : ", err);
    });
  RedisAddMessage(false, ContentID, AdminId, AdminName, "Welcome", CreatedAt);
  RedisAddUsers(false, ContentID, AdminId, AdminName);
}
/****************************** Content Lists ****************************** */
async function ContentLists(contentid) {
  var client = data.key[0];
  client.smembers("ClientLists", function (err, reply) {
    console.log(reply);
  });
}

/****************************** Adding each Message on a Content_Messages Field ********************* */
async function RedisAddMessage(
  update,
  ContentID,
  UserID,
  UserName,
  Message,
  Times
) {
  /***** Variables */
  var client = data.key[0];
  redisJson.use(client);
  let Message_Data_Obj = {
    user_id: [],
    user_name: [],
    message: [],
    times: [],
  };
  if (update == false) {
    /***** Set */
    redisJson
      .set(ContentID + "_messages", Message_Data_Obj)
      .then(() => {
        console.log("Redis message inserted : ", Message_Data_Obj);
      })
      .catch((err) => {
        console.log("Redis Error on message insertion : ", err);
      });
  } else {
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "user_id")
      .then(async (data) => {
        data.push(UserID);
        await redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "user_id", data)
          .then(() => {})
          .catch((err) => {
            console.log("87", err); //error when modifing error
          });
      })
      .catch((err) => {
        console.log("174", err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "user_name")
      .then(async (data) => {
        await data.push(UserName);
        redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "user_name", data)
          .then(() => {})
          .catch((err) => {
            console.log("102", err); //error when modifing error
          });
      })
      .catch((err) => {
        console.log("106", err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "times")
      .then(async (data) => {
        data.push(Times);
        console.log("Time adding", Times);
        await redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "times", data)
          .then(() => {
            console.log("Time pushed...", Times);
          })
          .catch((err) => {
            console.log("132", err); //error when modifing error
          });
      })
      .catch((err) => {
        console.log("136", err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_messages", "message")
      .then(async (data) => {
        data.push(Message);
        await redisJson
          .modifyValueByJsonKey(ContentID + "_messages", "message", data)
          .then(() => {})
          .catch((err) => {
            console.log("117", err); //error when modifing error
          });
      })
      .catch((err) => {
        console.log("121", err);
      });
  }
  /***** Get */
  await redisJson.getJSON(ContentID + "_messages").then((data) => {
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
        data.push(UserName);
        console.log(data, "TTTTTTTTTTT");
        redisJson
          .modifyValueByJsonKey(ContentID + "_users", "user_name", data)
          .then(() => {})
          .catch((err) => {
            console.log("174", err); //error when modifing error
          });
      })
      .catch((err) => {
        console.log("178", err);
      });
    /***** Set */
    await redisJson
      .getValueByJsonKey(ContentID + "_users", "user_id")
      .then((data) => {
        data.push(UserID);
        console.log(data, "TTTTTTTTTTT");
        redisJson
          .modifyValueByJsonKey(ContentID + "_users", "user_id", data)
          .then(() => {})
          .catch((err) => {
            console.log("193", err);
          });
      })
      .catch((err) => {
        console.log("197", err);
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
/****************************** Content Update **********************************/
async function RedisContentUpdate(ContentID, Hits, Likes, Shares) {
  /***** Variable */
  var client = data.key[0];
  redisJson.use(client);
  var res = false;
  /***** Set */
  if (Likes == 1) {
    await redisJson
      .getValueByJsonKey(ContentID + "_contentid", "no_of_likes")
      .then((data) => {
        redisJson
          .modifyValueByJsonKey(
            ContentID + "_contentid",
            "no_of_likes",
            data + 1
          )
          .catch((err) => {
            console.log("246", err); //error when modifing error
          });
      })
      .catch((err) => {
        console.log("255", err);
      });
    await redisJson
      .getValueByJsonKey(ContentID + "_contentid", "no_of_likes")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("263", err);
      });
    await client.zincrby("ClientIdListed", 1, ContentID);
  }
  if (Hits == 1) {
    await redisJson
      .getValueByJsonKey(ContentID + "_contentid", "no_of_hits")
      .then((data) => {
        redisJson
          .modifyValueByJsonKey(
            ContentID + "_contentid",
            "no_of_hits",
            data + 1
          )
          .catch((err) => {
            console.log("273", err); //error when modifing error
          });
      })
      .catch((err) => {
        console.log("277", err);
      });
    await redisJson
      .getValueByJsonKey(ContentID + "_contentid", "no_of_hits")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("285", err);
      });
  }
}
module.exports = {
  RedisAddContent,
  RedisAddMessage,
  RedisAddUsers,
  RedisCheckUser,
  RedisFetchMessages,
  RedisContentUpdate,
  RedisFlush,
};
