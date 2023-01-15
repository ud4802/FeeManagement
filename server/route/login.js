import router from "express"
const roter = router.Router();
import {User} from "../controller/user.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

roter.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ userName: req.body.userName });
		if (!user)
			return res.status(401).send({ message: "Invalid Username or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Username or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		userName: Joi.string().email().required().label("userName"),
		password: Joi.string().required().label("password"),
	});
	return schema.validate(data);
};

export default roter;