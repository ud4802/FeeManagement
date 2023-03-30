const express = require("express");
const router = express.Router();
const Excel = require("../model/Excel");
const User = require('../model/User');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  const { at } = req.body;
  // const deletedData = await Excel.findOneAndDelete({ email: req.body.e });

  // if (!sem || !year) return res.status(400).json({ 'message': 'sem and year are required.' });
  // console.log("hii");

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
    const foundExcel = await Excel.remove({
      $and: [
        { useremail: { $eq: foundUser[0].email } },
      ],
    });
  }
  else {
    res.status(400).json({ 'message': 'Not Autherised' });
  }


  // res.status(200).send(foundExcel); 
  // const deletedData = await excelModel.findOneAndDelete({ email: req.body.email });

  // console.log(req.body.email);
});

// excelModel.deleteOne(
//     { email : req.body.e },
//  )
// const foundData = await excelModel.find({email: req.body.e})
// excelModel.deleteOne(foundData);
// console.log(foundData);
// excelModel.findOneAndDelete({email: req.body.email})
module.exports = router;
