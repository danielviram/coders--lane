const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/register", usersController.registerUser);
router.put("/update-interests/:id", usersController.updateUserInterests);
router.put("/remove-interest/:id", usersController.removeUserInterest);

module.exports = router;
