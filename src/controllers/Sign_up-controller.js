const UserRepository = require("../repository/user-repository");
const userrepository = new UserRepository();

const create = async (req, res) => {
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

module.exports = {
  create,
};
