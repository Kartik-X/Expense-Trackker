const UserRepository = require("../repository/signup_login-repository");
const UserService = require("../services/login-service");
const userservice = new UserService();
const userrepository = new UserRepository();

const signup = async (req, res) => {
  try {
    const user = await userrepository.createUser(req.body);
    return res.status(201).json({
      data: user,
      success: true,
      message: "Successfully created a User",
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a user",
      err: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const response = await userservice.login(req.body.email, req.body.password);

    return res.status(200).json({
      data: response,
      success: true,
      message: "Logged In Successfully",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Unable to Login",
      err: error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.login_email;

    const response = await userservice.forgotPassword(email);

    return res.status(200).json({
      data: response,
      success: true,
      message: "Password recovery email sent Successfully",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Unable to send Password recovery email ",
      err: error,
    });
  }
};

const resetPasswordForm = async (req, res) => {
  try {
    const token = req.params.token;
    res.render("password-reset", { requestId: token });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Unable to fetch the form ",
      err: error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const updatedPassword = await userservice.resetPassword(
      req.params.token,
      req.body.password
    );

    res.send(
      `<p style="font-size: 25px; color: green; margin-top: 20px;">Password updated successfully! Kindly re-login.</p>`
    );
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Unable to reset the password ",
      err: error,
    });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  resetPasswordForm,
};
