const express = require("express");
const router = express.Router();
// const User = require('../model/User');
const Excel = require("../model/Excel");
const User = require('../model/User');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  const { at } = req.body;
  // if (!sem || !year) return res.status(400).json({ 'message': 'sem and year are required.' });
  console.log("Global Search");
  console.log(at);

  var user;
  const verify_token = jwt.verify(
    at.auth.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(400).json({ 'message': 'Not Autherised' }); //invalid token
      user = decoded.username;

    });

  if (user) {

    const foundUser = await User.find({ $and: [{ username: { $eq: user } }] }).exec();

    console.log(foundUser);

    if (foundUser.length) {

      const foundExcel = await Excel.find({
        $and: [
          { useremail: { $eq: foundUser[0].email } },
        ]
      }).exec();
        console.log(foundExcel);

      res.status(200).send(foundExcel);
    }
    else {
      res.status(400).json({ 'message': 'Not Autherised' });
    }
  }
});
// console.log("Done Global");
module.exports = router;
