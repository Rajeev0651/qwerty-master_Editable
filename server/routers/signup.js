const express = require("express");
const router = express.Router();
const user = require("../models/models.users");
const tokener = require("../models/models.tokens");
const jwt = require("jsonwebtoken");
const operation = require("../models/model_operations");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET_KEY;
const createtoken = (id) => {
  let token = jwt.sign({ id: id }, secret);
  return token;
};
const adddocument = async function (values, userid, token) {
  return new Promise((resolve) => {
    var adduser = new user({
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
      token: token,
      userId: userid,
    });
    adduser.save(async (err, userdoc) => {
      var res;
      if (err) return console.error(err);
      console.log("saved to user collection.");
      await operation.createIndexing(userid), // Creating new Indexing ID doc for each user    ( User Index Created )
        await operation.indexing(userid, "DetailsID", userdoc.id), // Adding user details ID   ( Updated )
        (res = await operation.CreateUserContent({
          //   ( Content initialized successfully !!!)
          userId: userdoc.userId,
          firstName: userdoc.firstName,
          lastName: userdoc.lastName,
        }));
      resolve(await operation.indexing(userdoc.userId, "ContentID", res)); //   ( Updated )
    }); // Adding user's content ID
  });
};
const addtoken = (token, userid) => {
  var addtokener = new tokener({
    token,
    userid,
  });
  addtokener.save(function (err, tokendoc) {
    if (err) return console.error(err);
    console.log("saved to token collection.");
    operation.indexing(userid, "TokenID", tokendoc.id);
  });
};
router.post("/signup", (req, res) => {
  user.find({ email: req.body.email }, async (err, document) => {
    if (err) console.log(err);
    if (document.length > 0) {
      res.send({ user: "email alreadt exist!" });
    } else if (document.length === 0) {
      const token = createtoken(req.body.email);
      await adddocument(req.body, req.body.email, token);
      await addtoken(token, req.body.email);
      const response = {
        token: token,
        succ: true,
      };
      res.send(response);
    }
  });
});
module.exports = router;
