import { User } from "./user.js";
//const { User } = require("../models/user");


export const regi = (req, res) => {
    const { userName, password } = req.body
    User.findOne({ username: userName }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                userName,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
}