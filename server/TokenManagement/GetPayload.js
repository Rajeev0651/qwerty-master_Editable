var jwt = require("jsonwebtoken");

function payload(token) {
  return new Promise((resolve) => {
    var decoded = jwt.decode(token, { complete: true });
    return resolve(decoded);
  });
}

module.exports = { payload };
