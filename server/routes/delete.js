const express = require("express");
const router = express.Router();
// const excelModel = require('../model/Excel');
const Excel = require("../model/Excel");
const User = require("../model/User");

// DELETE a single item by id
router.post("/", async (req, res) => {
  const { sem, year, at, e } = req.body;

  const foundUser = await User.find({
    $and: [{ username: { $eq: at.auth.user } }],
  }).exec();

  const deletedData = await Excel.findOneAndDelete({ email: req.body.e });

  if (!sem || !year)
    return res.status(400).json({ message: "sem and year are required." });

  const foundExcel = await Excel.find({
    $and: [
      { sem: { $eq: sem } },
      { year: { $eq: year } },
      { useremail: { $eq: foundUser[0].email } },
    ],
  }).exec();

  res.status(200).send(foundExcel);
});

module.exports = router;
