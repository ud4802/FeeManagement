const express = require('express');
const router = express.Router();
// const User = require('../model/User');
const Excel = require('../model/Excel');


router.get('/', async (req, res) => {
    console.log("Global");
  try {
    const users = await Excel.find().select('id rollno name sem year status email mobileno branch');
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;