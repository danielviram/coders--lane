const mongoose = require("mongoose");
const Joi = require("joi");

//Schema
const interestSchema = new mongoose.Schema({
  name: { type: String, min: 1, max: 255, required: true },
});

const Interest = mongoose.model("Interest", interestSchema);

const joiObjOptions = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

// Validate the properties of the interest
const interestValidator = (interest) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required().messages({
      "string.base": "Interest name should be a string.",
      "string.empty": "Interest name cannot be empty",
      "string.min": "Interest name should at least be 3 characters long",
      "string.max": "Interest name should not be over 255 characters long",
    }),
  }).options({ abortEarly: false });

  // Returns error or if it is good.
  return schema.validate(interest, joiObjOptions);
};

exports.interestSchema = interestSchema;
exports.Interest = Interest;
exports.interestValidator = interestValidator;
