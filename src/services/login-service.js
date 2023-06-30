const UserRepository = require("../repository/signup_login-repository");
const userrepository = new UserRepository();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const Sib = require("sib-api-v3-sdk");

class UserService {
  async login(email, plainPassword) {
    try {
      const user = await userrepository.getByEmail(email);

      const passwordMatch = this.checkpassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log("Password does not match");
        throw { error: "Incorrect password" };
      }
      const newJWT = this.createToken({ userId: user.id });
      return newJWT;
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

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY);
      return result;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  async forgotPassword(loginemail) {
    try {
      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email: "meta619012@gmail.com",
        name: "Expense-password Reset",
      };

      const recievers = [
        {
          email: loginemail,
        },
      ];

      await tranEmailApi.sendTransacEmail({
        sender,
        to: recievers,
        subject: "Trail to check the working",
        textContent: "Sendin blue checking out",
      });
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }
}
module.exports = UserService;
