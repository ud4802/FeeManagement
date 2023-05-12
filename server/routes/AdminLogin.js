const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

router.post("/", async (req, res) => {
  var url = localStorage.getItem("authUrl");
  console.log(url);
  if (req.body.user == process.env.ADMIN && req.body.pwd == process.env.PWD) {
    const refreshToken = jwt.sign(
      { adminname: req.body.user },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ refreshToken, url });
  } else {
    res.send(400);
  }
});

module.exports = router;
