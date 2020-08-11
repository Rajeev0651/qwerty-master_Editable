var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function RefreshToken(token) {
  return new Promise((resolve, reject) => {
    const key = process.env.REFRESHTOKENKEY;
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        console.log(err);
        return resolve((res = { status: "invalid" }));
      }
      console.log(decoded, "true");
      return resolve((res = { status: "ok" }));
    });
  });
}

function AccessToken(token) {
  return new Promise((resolve, reject) => {
    const key = process.env.ACCESSTOKENKEY;
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        console.log(err);
        return resolve((res = { status: "invalid" }));
      }
      console.log(decoded, "true");
      return resolve((res = { status: "ok" }));
    });
  });
}

function AccessAndRefreshToken(refreshtoken, accesstoken) {
  return new Promise(async (resolve) => {
    var refresh = await RefreshToken(refreshtoken);
    var access = await AccessToken(accesstoken);
    if (access.status == "ok" && refresh.status == "ok") {
      console.log("verification done");
      return resolve(true);
    } else {
      return resolve(false);
    }
  });
}
module.exports = { AccessAndRefreshToken };
