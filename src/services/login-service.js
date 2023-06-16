const UserRepository = require("../repository/signup_login-repository");
const userrepository = new UserRepository();

class UserService {
  async login(email, plainPassword) {
    try {
      const user = await userrepository.getByEmail(email);

      const passwordMatch = this.checkpassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log("Password does not match");
        throw { error: "Incorrect password" };
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in login  process");
      throw error;
    }
  }

  checkpassword(userPassword, storedPassword) {
    return userPassword == storedPassword;
  }
}
module.exports = UserService;
