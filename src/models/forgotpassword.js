"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ForgotPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ForgotPassword.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  ForgotPassword.init(
    {
      uuid: DataTypes.STRING,
      isActive: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ForgotPassword",
    }
  );
  return ForgotPassword;
};
