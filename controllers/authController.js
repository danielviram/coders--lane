const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/User");

const joiObjOptions = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const authValidator = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "any.required": "Username is required!",
      "string.empty": "Username cannot be empty!",
      "string.min": "Username should at least be 3 characters long.",
      "string.max": "Username should not be over 50 characters long.",
    }),
    password: Joi.string().min(5).max(1024).required().messages({
      "any.required": "Password is required!",
      "string.empty": "Password cannot be empty!",
      "string.min": "Password should at least be 5 characters long.",
      "string.max": "Password should not be over 1024 characters long.",
    }),
  }).options({ abortEarly: false });

  return schema.validate(user, joiObjOptions);
};

const authController = {
  userLogin: async (req, res) => {
    const { error } = authValidator(req.body);
    if (error) {
      const errorsArray = error.details.map((error) => error.message);
      return res.status(400).send(errorsArray);
    }

    let user = await User.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(401)
        .send({ invalidCredentialsError: "Invalid username or password!" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(401)
        .send({ invalidCredentialsError: "Invalid username or password!" });

    user = await User.findById(user._id)
      .populate("interests", "-__v")
      .select("-__v -password");

    const token = user.generateAuthToken();

    const resObj = {
      user: user,
      token: token,
    };

    res.send(resObj);
  },
  autoUserLogin: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.user._id })
        .populate("interests", "-__v")
        .select("-__v -password");

      if (!user)
        return res
          .status(400)
          .send({ message: "Something went wrong. Please try again later." });

      res.send(user);
    } catch {
      return res
        .status(400)
        .send({ message: "Something went wrong. Please try again later." });
    }
  },
};

module.exports = authController;
