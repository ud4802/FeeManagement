const express = require('express');
const router = express.Router();
// const excelModel = require('../model/Excel');
const Excel = require('../model/Excel');
const User = require('../model/User');

// DELETE a single item by id
router.post('/', async (req, res) => {
    const { sem,year,at,e} = req.body;

    const foundUser = await User.find({ $and: [{ username: { $eq: at.auth.user } }] }).exec();


    const deletedData = await Excel.findOneAndDelete({ email: req.body.e });

    if (!sem || !year) return res.status(400).json({ 'message': 'sem and year are required.' });
    // console.log("hii");
    const foundExcel = await Excel.find({$and: [{sem: {$eq: sem}},
    {year: {$eq: year}},{useremail: {$eq: foundUser[0].email}}]}).exec();

   
        res.status(200).send(foundExcel); 
    // const deletedData = await excelModel.findOneAndDelete({ email: req.body.email });

    // console.log(req.body.email);
});

// excelModel.deleteOne(
//     { email : req.body.e },
//  )
// const foundData = await excelModel.find({email: req.body.e})
// excelModel.deleteOne(foundData);
// console.log(foundData);
// excelModel.findOneAndDelete({email: req.body.email})
module.exports = router;
