const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, userValidator } = require("../models/User");
const { Interest } = require("../models/Interest");

const usersController = {
  getUsers: async (req, res) => {
    const users = await User.find()
      .populate("interests", "-__v")
      .select("-__v -password");
    res.send(users);
  },
  registerUser: async (req, res) => {
    const { error } = userValidator(req.body);
    if (error) {
      const errorsArray = error.details.map((error) => error.message);
      return res.status(400).send(errorsArray);
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send({ message: "Username is taken!" });

    user = new User(
      _.pick(req.body, ["firstName", "lastName", "username", "password"])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    user = await User.findById(user._id).select("-__v -password");

    const token = user.generateAuthToken();

    const resObj = {
      user: user,
      token: token,
    };

    res.send(resObj);
  },
  updateUserInterests: async (req, res) => {
    let user = await User.findById(req.params.id).select("-__v -password");
    if (!user) return res.status(404).send({ message: "User does not exist." });

    const newInterestsArray = await Promise.all(
      req.body.interests.map(async (interest) => {
        try {
          let interestItem = await Interest.findById(interest);
          if (!interestItem)
            return res.status(404).send({ message: "Interest was not found." });
          return interestItem;
        } catch {
          return res.status(404).send({ message: "Interest was not found." });
        }
      })
    );

    user.interests = newInterestsArray;
    user = await user.save();

    res.send(user);
  },
  removeUserInterest: async (req, res) => {
    let user = await User.findById(req.params.id)
      .populate("interests", "-__v")
      .select("-__v -password");
    if (!user) return res.status(404).send({ message: "User does not exist." });

    const sentInterest = await Interest.findById(req.body.interest);
    if (!sentInterest)
      return res.status(404).send({ message: "Interest was not found." });

    const newInterestsArray = user.interests.filter(
      (interest) => !sentInterest._id.equals(interest._id)
    );

    user.interests = newInterestsArray;
    user = await user.save();

    res.send(user);
  },
};

module.exports = usersController;
