const express = require("express");
const router = express.Router();
const Excel = require("../model/Excel");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { at } = req.body;
  console.log("update");
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
    const result = await Excel.updateMany(
      { useremail: foundUser[0].email }, // filter
      { $inc: { sem: 1 } } // update operator
    );
    console.log(result);

    const foundExcel = await Excel.remove({
      $and: [{ sem: { $eq: 9 } }],
    });
  } else {
    res.status(400).json({ message: "Not Autherised" });
  }
});
module.exports = router;
