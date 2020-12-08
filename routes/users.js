const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.get('/same-interest-users/:id', usersController.getSameInterestUsers);
router.post("/register", usersController.registerUser);

module.exports = router;
