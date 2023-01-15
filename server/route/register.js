import router from "express"
const roter = router.Router();
import { User, validate } from "../controller/user.js";
import bcrypt from "bcryptjs";

roter.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ userName: req.body.userName });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given username already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
export default roter;
