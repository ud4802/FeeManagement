const User = require('../model/User');
const bcrypt = require('bcrypt');
const Token = require("../model/token");
const sendEmail = require("../routes/sendEmail");

const handleNewUser = async (req, res) => {
    const { user, pwd, email, branch } = req.body;
    if (!user || !pwd || !email || !branch) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ branch: branch }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "email": email,
            "branch": branch
        });

        console.log(result);

        const url = `${process.env.BASE_URL}adminverify/${result._id}`;

        sendEmail("ud278019@gmail.com", "user verfication", url);
   
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }     
    
}

module.exports = { handleNewUser };