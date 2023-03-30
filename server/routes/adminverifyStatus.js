
const express = require('express');

const User = require('../model/User');

const router = require("express").Router();
const Excel = require('../model/Excel');
const jwt = require('jsonwebtoken');





router.post("/", async (req, res) => {

    
    console.log(req.body.admin);
    console.log(req.body.e);

    var user;
    const verify_token = jwt.verify(
        req.body.admin.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(400).json({ 'message': 'Not Autherised' }); //invalid token
            user = decoded.adminname;
        });

    if(user)
    {
        var myquery = { email: req.body.e };
            var newvalues = { $set: { verified: "true" } };
            User.updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
                // db.close();
            });

    }
});

module.exports = router;