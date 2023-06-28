const { Expense } = require("../models/index");
const { JWT_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");

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

  async deletedata(userid) {
    try {
      await Expense.destroy({
        where: {
          id: userid,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }
}
module.exports = ExpenseRepository;
