
const express = require('express');

const User = require('../model/User');

const router = require("express").Router();
const sendEmail = require("./sendEmail");






router.post("/:id", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }); 
		//if user does	not exist
		if (!user) return res.status(400).send({ message: "Invalid link" });
		
        res.send(user);

		res.status(200);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  reset password
router.post("/:id/verify", async (req, res) => {
	try {
		
        const {email} = req.body;
		const user = await User.findOne({ _id: req.params.id });
        console.log(req.params.id);
		if (!user) return res.status(400).send({ message: "Invalid link" });


        var myquery = { _id:req.params.id };
        var newvalues = { $set: { verified: "true"} };
        User.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
           
        });

		
		res.status(200).send({ message: "verification successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//exprt router
module.exports = router;