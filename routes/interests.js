const express = require("express");
const interestController = require("../controllers/interestController");

const router = express.Router();

router.get("/", interestController.getInterests);
router.post("/", interestController.createInterest);

module.exports = router;
