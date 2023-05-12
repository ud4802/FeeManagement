const express = require("express");
const router = express.Router();
// const Excel = require("../model/Excel");
const excelModel = require("../model/Excel");
const excelModel2 = require("../model/Excel");
const User = require("../model/User");

router.post("/", async (req, res) => {
  const { updatedUserData, sem, year, at } = req.body;

  console.log(updatedUserData);

  const foundUser = await User.find({
    $and: [{ username: { $eq: at.auth.user } }],
  }).exec();

  await excelModel.deleteMany({
    $and: [{ sem: { $eq: sem } }, { year: { $eq: year } }],
  });
  for (var k = 0; k < updatedUserData.length; k++) {
    const result = excelModel.create({
      id: updatedUserData[k].id,
      name: updatedUserData[k].name,
      sem: sem,
      year: year,
      status: updatedUserData[k].status,
      email: updatedUserData[k].email,
      mobileno: updatedUserData[k].mobileno,
      branch: foundUser[0].branch,
      useremail: foundUser[0].email,
    });
  }
});

module.exports = router;
