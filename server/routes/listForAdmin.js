const express = require("express");
const router = express.Router();
const Excel = require("../model/Excel");
const User = require("../model/User");
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  const { branch, sem, year, at } = req.body;
  console.log(at);
  if (!sem || !year)
    return res.status(400).json({ message: "sem and year are required." });
  console.log("hii");


  var user;
  const verify_token = jwt.verify(
    at.admin.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(400).json({ 'message': 'Not Autherised' }); //invalid token
      user = decoded.adminname;

    });


  if (user) {
    const foundExcel = await Excel.find({
      $and: [{ sem: { $eq: sem } }, { year: { $eq: year } }, { branch: { $eq: branch } }],
    }).exec();

    res.status(200).send(foundExcel);

  }

});

module.exports = router;
