const UserRepository = require("../repository/signup_login-repository");
const userrepository = new UserRepository();
const { ForgotPassword } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");

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

  async forgotPassword(login_email) {
    try {
      const user = await userrepository.getByEmail(login_email);

      const resetToken = uuidv4();

      const forgotToken = await userrepository.Post_forgotToken(
        resetToken,
        user.id
      );

      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email: "meta619012@gmail.com",
        name: "Expense-password Reset",
      };

      const recievers = [
        {
          email: login_email,
        },
      ];

      await tranEmailApi.sendTransacEmail({
        sender,
        to: recievers,
        subject: "Trail to check the working",
        textContent: `<h3>Kindly click on the below link to reset your password</h3>
        <a href="http://localhost:5000/resetpasswordForm/${resetToken}">Reset Password</a>
        
        cheers`,
      });
      return true;
    } catch (error) {
      console.log("Something went wrong at password reset");
      throw { error };
    }
  }

  async resetPassword(token, updatedPassword) {
    try {
      const user = await ForgotPassword.findOne({
        where: { uuid: token },
      });

      if (user.dataValues.uuid && user.dataValues.isActive == "true") {
        try {
          const updateUser = await userrepository.resetPassword(
            user,
            updatedPassword
          );
          return updateUser;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log("Something went wrong in updating password");
      throw { error };
    }
  }
}
module.exports = UserService;
