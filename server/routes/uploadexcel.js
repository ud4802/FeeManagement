const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const excelModel = require('../model/Excel');
const User = require('../model/User');

router.post('/', async (req, res) => {
  // const data = req.body;
  const { data, sem, year, at } = req.body;
  if (!at) return res.status(400).json({ 'message': 'Not Autherised' });
  if(!data.length)
  {
    res.send("empty");
  }

  // const foundUser = await User.findOne({email: loggedInUser},'branch');
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
    for (var k = 0; k < data.length; k++) {
      let user = await excelModel.findOne({ email: data[k].Email });
      if (!user) {

        const result = excelModel.create({
          "id": data[k].ID,
          "name": data[k].Name,
          // "emailcount" : emailcount, 
          "sem": sem,
          "year": year,
          "status": data[k].Status,
          "email": data[k].Email,
          "mobileno": data[k].MobileNo,
          // "userId" : req.body.User_id,
          "branch": foundUser[0].branch,
          "useremail": foundUser[0].email,
        });
      }
    }
    // console.log(foundUser.branch);

  }else{
    res.status(400).json({ 'message': 'Not Autherised' });
  }



  // excelModel.insertMany([ {sem:sem,year:year,data} ], (error, result) => {
  //   if (error) {
  //     res.status(500).json({ error });
  //   } else {
  //     res.json({ result });
  //   }
  // });
});

module.exports = router;
