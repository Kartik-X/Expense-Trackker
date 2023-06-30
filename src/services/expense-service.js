const { login } = require("../controllers/signup_login-controller");
const ExpenseRepository = require("../repository/expense-repository");

class ExpenseService {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  async createdata(data) {
    try {
      const expense = await this.expenseRepository.createdata(data);
      return expense;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async getdata(data) {
    try {
      const expense = await this.expenseRepository.getdata(data);
      return expense;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async updatedata(userid, data) {
    try {
      const resource = await this.expenseRepository.updatedata(userid, data);
      return resource;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async deletedata(userid, amount, user) {
    try {
      user.Total_Expense = user.Total_Expense - Number(amount);

      const response = await this.expenseRepository.deletedata(userid, user);
      return response;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async updateexpense(user, data) {
    try {
      let userId = user.id;
      let amount = data.expense_amount;

      if (user.Total_Expense == undefined) {
        user.Total_Expense = amount;
      } else {
        user.Total_Expense = user.Total_Expense + Number(amount);
      }

      const expense = await this.expenseRepository.updateexpense(userId, user);
      return expense;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }
}

module.exports = ExpenseService;
