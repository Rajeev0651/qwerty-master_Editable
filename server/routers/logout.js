const router = require("express").Router();

router.get("/logout", (req, res) => {
  const response = {
    status: "ok",
  };
  res.cookie("ATC", 0, {
    maxAge: 0,
    httpOnly: true,
  });
  res.cookie("RTC", 0, {
    maxAge: 0,
    httpOnly: true,
  });
  res.send(response);
});

module.exports = router;
