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

    const interest = await Interest.findById(req.body.interest);
    if (!interest) return res.status(404).send({ message: 'Language was not found!' });

    user = new User(
      _.pick(req.body, ["firstName", "lastName", "username", "password", "interest"])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    user = await User.findById(user._id).populate('interest', '-__v').select("-__v -password");

    const token = user.generateAuthToken();

    const resObj = {
      user: user,
      token: token,
    };

    res.send(resObj);
  },
  getSameInterestUsers: async (req, res) => {
    const currentUser = await User.findById(req.body.userId);
    if (!currentUser) return res.status(404).send({ message: "User was not found." })

    const allUsers = await User.find().populate('interest', '-__v').select('-__v -password');

    const sameInterestUsers = allUsers.filter(user => !user._id.equals(currentUser._id));

    const newSameInterestUsers = sameInterestUsers.filter(user => user.interest.equals(currentUser.interest));
    console.log(newSameInterestUsers);

    res.send(newSameInterestUsers)
  }
};

module.exports = usersController;
