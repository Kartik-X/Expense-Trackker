const express = require("express");
const router = express.Router();

const signup_LoginController = require("../controllers/signup_login-controller");

router.post("/sign-up", signup_LoginController.signup);

router.post("/login", signup_LoginController.login);

module.exports = router;
