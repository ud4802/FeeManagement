
import { User } from "./user.js";

export const log = (req,res) => {
    const { userName, password} = req.body
    User.findOne({ userName: userName}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}