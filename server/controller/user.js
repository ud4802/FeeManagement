//import  {mongoose,userSchema}  from "../index.js";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    //email: { type: String, required: false, unique: true },
    //password: { type: String, required: true, min: 6 },
    //isVerified: { type: Boolean, default: false },
   });

   userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

   const User = mongoose.model("user",userSchema);

   const validate = (data) => {
	const schema = Joi.object({
		userName: Joi.string().required().label("userName"),
		/*email: Joi.string().email().required().label("Email"),*/
		password: passwordComplexity().required().label("password"),
	});
	return schema.validate(data);
};

export { User , validate };