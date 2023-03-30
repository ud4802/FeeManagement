const express = require('express');
const router = express.Router();
const Excel = require('../model/Excel');
const User = require('../model/User');
const jwt = require("jsonwebtoken");



router.post('/',async(req,res) => {
  const { sem, year, at } = req.body;

  if (!sem || !year) return res.status(400).json({ 'message': 'sem and year are required.' });
  if (!at) return res.status(400).json({ 'message': 'Not Autherised' });
  console.log("hii");

  console.log(at.auth.refreshToken);
  var user;
  const verify_token = jwt.verify(
    at.auth.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(400).json({ 'message': 'Not Autherised' }); //invalid token
      user = decoded.username;
      
  });

  const foundUser = await User.find({ $and: [{ username: { $eq: user } }] }).exec();

  console.log(foundUser);

  if (foundUser.length) {
    const foundExcel = await Excel.find({
      $and: [{ sem: { $eq: sem } },
      { year: { $eq: year } }, { useremail: { $eq: foundUser[0].email } }] 
    }).exec();

    console.log(foundUser[0].email);
    res.status(200).send(foundExcel);
  }else{
    res.status(400).json({ 'message': 'Not Autherised' });
  }
    
})

  module.exports = router;