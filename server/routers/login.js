const router = require("express").Router();
let user = require("../models/models.users");
let tokener = require("../models/models.tokens");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();
const secret = process.env.SECRET_KEY;
const createtoken = (id) => {
  let token = jwt.sign({ id: id }, secret);
  return token;
};
const addtoken = (token, userid) => {
  var addtokener = new tokener({
    token,
    userid,
  });
  addtokener.save(function (err, tokendoc) {
    if (err) return console.error(err);
    console.log(" saved to token collection.");
  });
};
router.post("/login", (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://localhost:3000");
  res.set("Access-Control-Allow-Credentials", "true");
  user.find(
    { email: req.body.loginemail, password: req.body.loginpassword },
    (err, document) => {
      if (err) console.log(err);
      else {
        if (document.length === 0) {
          res.json({ user: "invalid email/password" });
        } else {
          const token = createtoken(document[0].userId);
          addtoken(token, document[0].userId);
          document[0].token = token;
          document[0].save();
          const response = {
            token: token,
            succ: true,
          };
          res.status(200).send(response);
        }
      }
    }
  );
});

module.exports = router;
