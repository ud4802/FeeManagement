const express = require("express");
const router = express.Router();
// const Excel = require("../model/Excel");
const excelModel = require("../model/Excel");
const excelModel2 = require("../model/Excel");
 const User = require('../model/User');

router.post("/", async (req, res) => {
  // const id = req.body.id;
  // console.log(id);
  const {updatedUserData,sem, year,at } = req.body;
  // console.log(data[0].Name);
  // console.log(userData[0].name);
  // console.log(userData);
  console.log(updatedUserData);
  // console.log(userData);
  // for (var k = 0; k < userData.length; k++) {}
  // console.log(updatedUserData.length);

  const foundUser = await User.find({ $and: [{ username: { $eq: at.auth.user } }] }).exec();


  await excelModel.deleteMany({$and: [{ sem: { $eq: sem } }, { year: { $eq: year } }],}); 
  // // console.log("Database Deleted");
  // // foundExcel.remove();

  for (var k = 0; k < updatedUserData.length; k++) {
    
      const result = excelModel.create({
        "id" : updatedUserData[k].id,
        "name" : updatedUserData[k].name,
        "sem" : sem,
        "year" : year,
        "status" : updatedUserData[k].status,
        "email" : updatedUserData[k].email,
        "mobileno" : updatedUserData[k].mobileno,
        // "userId" : req.body.User_id,
        "useremail" : foundUser[0].email,

      });
    }
  
  // console.log();
  // res.send(updatedUserData);
});
// console.log("Updated Successfully");
module.exports = router;