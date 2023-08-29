const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

router.post("/", async (req, res) => {
  var url = localStorage.getItem("authUrl");
  console.log(url);
  console.log(req.body.user);
  console.log(req.body.pwd);
  console.log(process.env.ADMIN);
  console.log(process.env.PASWD);
  if(req.body.user == process.env.ADMIN){
    console.log("Thay che match")
  }
  if(req.body.pwd == process.env.PASWD){
    console.log("Thay match")
  }
  console.log(typeof(process.env.ADMIN));
  console.log(typeof(req.body.user));
  console.log(typeof(process.env.PASWD));
  console.log(typeof(req.body.pwd));
 
  if (req.body.user == process.env.ADMIN && req.body.pwd == process.env.PASWD) {
    const refreshToken = jwt.sign(
      { adminname: req.body.user },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ refreshToken, url });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
