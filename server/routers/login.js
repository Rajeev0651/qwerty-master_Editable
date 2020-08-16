const router = require("express").Router();
let user = require("../models/models.users");
const tokenoperation = require("../TokenManagement/CreateToken");

router.post("/login", (req, res) => {
  user.find(
    { email: req.body.loginemail, password: req.body.loginpassword },
    (err, document) => {
      if (err) {
        console.log(err);
        const response = {
          status: "invalid",
          message: "Server Error",
        };
        res.send(response).sendStatus(500);
      } else {
        if (document.length === 0) {
          const response = {
            status: "invalid",
            message: "Wrong email",
          };
          res.send(response);
        } else {
          const UserId = document[0].userId;
          const token = tokenoperation.AccessAndRefreshToken(UserId, document[0].firstName);
          const response = {
            status: "ok",
          };
          console.log("Login Done !!");
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
      }
    }
  );
});

module.exports = router;
