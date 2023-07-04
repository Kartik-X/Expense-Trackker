const express = require("express");
const router = express.Router();

const signup_LoginController = require("../controllers/signup_login-controller");

router.post("/sign-up", signup_LoginController.signup);

router.post("/login", signup_LoginController.login);

router.post("/forgot-password", signup_LoginController.forgotPassword);

router.get(
  "/resetpasswordForm/:token",
  signup_LoginController.resetPasswordForm
);

router.post("/resetpassword/:token", signup_LoginController.resetPassword);

module.exports = router;
