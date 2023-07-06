const { Expense, User } = require("../models/index");
const { JWT_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class ExpenseRepository {
  async createdata({ date, expense_amount, description, category, userId }) {
    const userid = jwt.verify(userId, JWT_KEY).userId;

    try {
      const expense = await Expense.create({
        date,
        expense_amount,
        description,
        category,
        userId: userid,
      });
      return expense;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }

  async getdata(data) {
    try {
      const expense = await Expense.findAll({
        where: {
          userId: data.user.id,
        },
      });

      return expense;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }

  async PeriodData(data) {
    const userid = data.user.id;
    const { Start_Date, End_Date } = data.query;
    try {
      const expense = await Expense.findAll({
        where: {
          userId: userid,
          date: {
            [Op.between]: [Start_Date, End_Date],
          },
        },
      });
      return expense;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }

  async updatedata(userid, userbody) {
    try {
      const resource = await Expense.update(userbody, {
        where: {
          id: userid,
        },
      });
      return resource;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }

  async deletedata(userid, user) {
    try {
      const resource = await User.update(
        { Total_Expense: user.Total_Expense },
        {
          where: {
            id: user.id,
          },
        }
      );
      await Expense.destroy({
        where: {
          id: userid,
        },
      });
      return resource;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }
  async updateexpense(userid, data) {
    try {
      const resource = await User.update(
        { Total_Expense: data.Total_Expense },
        {
          where: {
            id: userid,
          },
        }
      );
      return resource;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }
}
module.exports = ExpenseRepository;
