const express = require('express');
const router = express.Router();
const Excel = require('../model/Excel');
const User = require('../model/User');
const jwt = require("jsonwebtoken");

router.post('/', async (req, res) => {
    const { list, at } = req.body;
    console.log(list);

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
        for (var k = 0; k < list.length; k++) {
            var myquery = { email: list[k][0] };
            var newvalues = { $set: { status: "Not Paid" } };
            Excel.updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
                // db.close();
            });
        }
        const foundExcel = await Excel.find({
            $and: [
              { useremail: { $eq: foundUser[0].email } },
            ],
          }).exec();
          //   console.log(foundExcel);
      
          res.status(200).send(foundExcel);
    }
    else{
        res.status(400).json({ 'message': 'Not Autherised' });
    }

    // res.status(200).send(foundExcel);

})

module.exports = router;