var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function AccessToken(UserId) {
  const privatekey = process.env.ACCESSTOKENKEY;

  var accesstoken = jwt.sign(
    {
      id: UserId,
      iat: Math.floor(Date.now() / 1000),
      exp: (Math.floor(Date.now() / 1000) + (60 * 60)),
    },
    privatekey
  );
  return accesstoken;
}

function RefreshToken(UserId) {
  const privatekey = process.env.REFRESHTOKENKEY;
  var refreshtoken = jwt.sign(
    {
      id: UserId,
      iat: Math.floor(Date.now() / 1000),
      exp: (Math.floor(Date.now() / 1000) + (60 * 60)),
    },
    privatekey
  );
  return refreshtoken;
}

function AccessAndRefreshToken(UserId) {
  const accesstokenkey = AccessToken(UserId);
  const refreshtokenkey = RefreshToken(UserId);
  const key = {
    AccessToken: accesstokenkey,
    RefreshToken: refreshtokenkey,
  };
  return key;
}

module.exports = { AccessAndRefreshToken };
