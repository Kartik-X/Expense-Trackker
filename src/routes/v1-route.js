const express = require("express");
const router = express.Router();

const signupController = require("../controllers/Sign_up-controller");

router.post("/", signupController.create);

module.exports = router;
