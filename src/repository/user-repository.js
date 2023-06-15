const { User } = require("../models/index");

class UserRepository {
  async createUser({ username, email, password }) {
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }
}
module.exports = UserRepository;
