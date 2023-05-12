const nodemailer = require("nodemailer");
const router = require("express").Router();
const send = require("./Alert");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { list, at } = req.body;

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

  console.log(list);
  if (foundUser.length) {
    for (var k = 0; k < list.length; k++) {
      send(list[k], process.env.SUBJECT, process.env.TEXT);
    }
  } else {
    res.status(400).json({ message: "Not Autherised" });
  }
});

module.exports = router;
