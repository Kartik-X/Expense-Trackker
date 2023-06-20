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

  async getdata() {
    try {
      const expense = await this.expenseRepository.getdata();
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

  async deletedata(userid) {
    try {
      const response = await this.expenseRepository.deletedata(userid);
      return response;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }
}
module.exports = ExpenseService;
