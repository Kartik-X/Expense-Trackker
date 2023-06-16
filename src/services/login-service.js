const UserRepository = require("../repository/signup_login-repository");
const userrepository = new UserRepository();
const bcrypt = require("bcrypt");

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

  checkpassword(userPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparision");
      throw error;
    }
  }
}
module.exports = UserService;
