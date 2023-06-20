const { Expense } = require("../models/index");

class ExpenseRepository {
  async createdata({ date, expense_amount, description, category }) {
    try {
      const expense = await Expense.create({
        date,
        expense_amount,
        description,
        category,
      });
      return expense;
    } catch (error) {
      console.log(error);
      console.log("Something went in repository layer");
    }
  }

  async getdata() {
    try {
      const expense = await Expense.findAll();
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
