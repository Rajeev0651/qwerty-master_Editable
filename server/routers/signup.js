const express = require("express");
const router = express.Router();
const user = require("../models/models.users");
const operation = require("../models/model_operations");
const tokenoperation = require("../TokenManagement/CreateToken");
const adddocument = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new user({
      userId: UserData.email,
      firstName: UserData.firstname,
      lastName: UserData.lastname,
      email: UserData.email,
      password: UserData.password,
    });
    AddUser.save(async (err, userdoc) => {
      var res;
      if (err) return console.error(err);
      console.log("Saved to user collection (SignUp)");
      await operation.createIndexing(UserData.email), // Creating New Indexing Doc for each User    ( User Index Created )
        await operation.indexing(UserData.email, "DetailsID", userdoc.id), // Adding user details ID   ( Updated )
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
router.post("/signup", (req, res) => {
  user.find({ email: req.body.email }, async (err, document) => {
    if (err) {
      console.log(err, "signup");
      const response = {
        status: "invalid",
        message: "Server Error",
      };
      res.send(response).sendStatus(500);
    }
    if (document.length > 0) {
      const response = {
        status: "invalid",
        message: "Email exists",
      };
      res.send(response).sendStatus(400);
    } else if (document.length === 0) {
      const UserId = req.body.email; // Store UserID on Variable
      const Name = req.body.firstname
      const UserData = req.body;
      const token = tokenoperation.AccessAndRefreshToken(UserId, Name); // Generate and access and refresh token
      await adddocument(UserData);
      console.log("Tokens : ", token);
      const response = {
        status: "ok",
      };
      console.log("SignUp Done !!");
      res.cookie("ATC", token.AccessToken, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.cookie("RTC", token.RefreshToken, {
        maxAge: 864000000,
        httpOnly: true,
      });
      res.cookie("CTC", token.ChatToken, {
        maxAge: 864000000,
      });
      res.send(response);
    }
  });
});
module.exports = router;
