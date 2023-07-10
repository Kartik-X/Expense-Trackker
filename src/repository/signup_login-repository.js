const { User, ForgotPassword } = require("../models/index");

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

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        throw { error: "User not found" };
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in repository layerg");
      throw error;
    }
  }

  async Post_forgotToken(resetToken, userId) {
    try {
      const user = await ForgotPassword.create({
        uuid: resetToken,
        isActive: "true",
        userId: userId,
      });

      return user;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
  async resetPassword(user, updatedPassword) {
    try {
      const updateUser = await User.findByPk(user.dataValues.userId);
      if (updateUser) {
        updateUser.password = updatedPassword;
        await updateUser.save();
      } else {
        throw { error: "No such user found" };
      }
      const update_isActive = await ForgotPassword.update(
        { isActive: "false" },
        {
          where: {
            uuid: user.dataValues.uuid,
          },
        }
      );
      return updateUser;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
}
module.exports = UserRepository;
