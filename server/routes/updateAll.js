const express = require("express");
const router = express.Router();
// const User = require('../model/User');
const Excel = require("../model/Excel");
const User = require('../model/User');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  const { at } = req.body;
  // if (!sem || !year) return res.status(400).json({ 'message': 'sem and year are required.' });
  console.log("update");
  //   console.log(loggedInUser);

  var user;
  const verify_token = jwt.verify(
    at.auth.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(400).json({ 'message': 'Not Autherised' }); //invalid token
      user = decoded.username;

    });

  const foundUser = await User.find({ $and: [{ username: { $eq: user } }] }).exec();

  if (foundUser.length) {

    
    const result = await Excel.updateMany(
      { useremail: foundUser[0].email }, // filter
      { $inc: { sem: 1 } } // update operator
    );
    console.log(result);

    const foundExcel = await Excel.remove({
      $and: [
        { sem: { $eq: 9 } },
      ],
    });
  }
  else {
    res.status(400).json({ 'message': 'Not Autherised' });
  }
});
// console.log("Done Global");
module.exports = router;
