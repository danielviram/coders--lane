require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, min: 3, max: 50, required: true },
  lastName: { type: String, min: 3, max: 50, required: true },
  username: { type: String, min: 3, max: 50, unique: true, required: true },
  email: { type: String, min: 1, max: 50, required: true, unique: true },
  password: { type: String, min: 6, max: 1024, required: true },
  interest: { type: mongoose.Schema.Types.ObjectId, ref: "Interest", required: false }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

const joiObjOptions = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const passwordComplexityOptions = {
  min: 6,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const userValidator = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required().messages({
      "string.base": "First name should be a string.",
      "string.empty": "First name cannot be empty.",
      "string.min": "First name should at least be 3 characters long.",
      "string.max": "First name should not be over 50 characters long.",
    }),
    lastName: Joi.string().min(3).max(50).required().messages({
      "string.base": "Last name should be a string.",
      "string.empty": "Last name cannot be empty.",
      "string.min": "Last name should at least be 3 characters long.",
      "string.max": "Last name should not be over 50 characters long.",
    }),
    username: Joi.string().alphanum().min(5).max(50).required().messages({
      "string.base": "Username should be a string.",
      "string.empty": "Username cannot be empty.",
      "string.min": "Username should at least be 3 characters long.",
      "string.max": "Username should not be over 50 characters long.",
      "string.alphanum": "Username must only contain alpha-numeric characters.",
    }),
    email: Joi.string().min(1).max(50).email().required().messages({
      "string.base": "Email should be a string.",
      "string.empty": "Email cannot be empty.",
      "string.min": "Email should at least be 1 character long.",
      "string.max": "Email should not be over 50 characters long.",
      "string.email": "Email must be a valid email.",
    }),
    password: passwordComplexity.default(passwordComplexityOptions),
    interest: Joi.objectId().required().messages({
      "any.required": "Interest is required."
    }),
  }).options({ abortEarly: false });

  return schema.validate(user, joiObjOptions);
};

exports.userSchema = userSchema;
exports.User = User;
exports.userValidator = userValidator;
