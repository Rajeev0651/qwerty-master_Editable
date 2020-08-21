var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function AccessToken(UserId, Name) {
  const privatekey = process.env.ACCESSTOKENKEY;

  var accesstoken = jwt.sign(
    {
      id: UserId,
      name: Name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privatekey
  );
  return accesstoken;
}

function RefreshToken(UserId, Name) {
  const privatekey = process.env.REFRESHTOKENKEY;
  var refreshtoken = jwt.sign(
    {
      id: UserId,
      name: Name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privatekey
  );
  return refreshtoken;
}

function ChatToken(UserId, Name) {
  const privatekey = process.env.CHATTOKEN;

  var chattoken = jwt.sign(
    {
      id: UserId,
      name: Name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privatekey
  );
  return chattoken;
}

function AccessAndRefreshToken(UserId, Name) {
  const accesstokenkey = AccessToken(UserId, Name);
  const refreshtokenkey = RefreshToken(UserId, Name);
  const chattoken = ChatToken(UserId, Name)
  const key = {
    AccessToken: accesstokenkey,
    RefreshToken: refreshtokenkey,
    ChatToken: chattoken,
  };
  return key;
}

module.exports = { AccessAndRefreshToken, RefreshToken, AccessToken, ChatToken };
