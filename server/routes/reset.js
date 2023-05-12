const router = require("express").Router();
const User = require("../model/User");
const Token = require("../model/token");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");
// for password complexity
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
// bcrypt to hash passwords and reset tokens
const bcrypt = require("bcrypt");
const amqp = require("amqplib/callback_api");

// send password link
router.post("/", async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    console.log(req.body);
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    console.log("user >> ", user);
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;

    sendEmail(user.email, "Password Reset", url);

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    //if user does	not exist
    if (!user) return res.status(400).send({ message: "Invalid link" });
    //create new user
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    // check token availability
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//  reset password
router.post("/:id/:token", async (req, res) => {
  console.log(req.body);
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("password"),
    });
    console.log(passwordComplexity);
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    console.log("u");
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword; //new password
    await user.save();
    await token.remove();
    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//exprt router
module.exports = router;
