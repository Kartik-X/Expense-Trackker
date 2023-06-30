const ExpenseService = require("../services/expense-service");
// const { User } = require("../models/index");

const expenseservice = new ExpenseService();

const create = async (req, res) => {
  try {
    const expense = await expenseservice.createdata(req.body);

    return res.status(201).json({
      data: expense,
      success: true,
      message: "Successfully created a expense",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a expense",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const expenses = await expenseservice.getdata(req);

    return res.status(201).json({
      data: expenses,
      success: true,
      message: "Successfully fetched all the expenses",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the expenses",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await expenseservice.updatedata(req.params.id, req.body);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully updated the expenses",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update the expense",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await expenseservice.deletedata(req.params.id);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully deleted the expense",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to delete the expense",
      err: error,
    });
  }
};

const premium_check = async (req, res) => {
  try {
    const response = await req.user.dataValues.ispremium;
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully checked for premium",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to check for premium",
      err: error,
    });
  }
};

const leaderboard = async (req, res) => {
  try {
    const expense = await expenseservice.updateexpense(req.user, req.body);
    return res.status(201).json({
      data: expense,
      success: true,
      message: "Successfully updated expense",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update the total expense",
      err: error,
    });
  }
};

module.exports = {
  create,
  getAll,
  update,
  destroy,
  premium_check,
  leaderboard,
};
