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

module.exports = {
  signup,
  login,
};
