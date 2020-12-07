const _ = require("lodash");
const { Interest, interestValidator } = require("../models/Interest");

const interestController = {
  getInterests: async (req, res) => {
    //GET All Interest
    const interests = await Interest.find(); // Have it await to get all the Interest
    res.send(interests);
  },
  createInterest: async (req, res) => {
    // POST Interest
    const { error } = interestValidator(req.body); // Responce if any errors

    // if thre is an error, it will return a 400 with the error message in an array
    if (error) {
      const errorsArray = error.details.map((error) => error.message); // details is in array. Map will returns a new array with just an error message
      return res.status(400).send(errorsArray); // if there is errors send the erros in one array to the user.
    }

    // Save to database
    let interest = new Interest(_.pick(req.body, ["name"]));

    // Save to database
    interest = await interest.save();

    // looks for recently saved interest
    interest = await Interest.findById(interest._id).select("-__v");

    //returns the interest
    res.send(interest);
  },
};

module.exports = interestController;
