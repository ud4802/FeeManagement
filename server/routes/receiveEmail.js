const router = require("express").Router();

var axios = require("axios");
var qs = require("qs");
var gmail = require("./Gmail");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { data, at } = req.body;
  console.log(data);

  var user;
  const verify_token = jwt.verify(
    at.auth.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(400).json({ message: "Not Autherised" }); //invalid token
      user = decoded.username;
    }
  );

  const foundUser = await User.find({
    $and: [{ username: { $eq: user } }],
  }).exec();

  if (foundUser.length) {
    gmail.readInboxContent(data, req, res);
  } else {
    res.status(400).json({ message: "Not Autherised" });
  }
});

module.exports = router;
