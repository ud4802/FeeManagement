const express = require("express");
const router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  console.log(`${req.query.q}`);
  console.log("MKC");

  var user;
  const verify_token = jwt.verify(
    `${req.query.q}`,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(400).json({ message: "Not Autherised" }); //invalid token
      user = decoded.adminname;
    }
  );
  
  if (user) {
    try {
      const users = await User.find().select("username email verified branch");
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
});

module.exports = router;
