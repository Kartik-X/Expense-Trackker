const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/Auth");

const expense_Controller = require("../controllers/expense-controller");

router.post("/expense", expense_Controller.create);

router.get("/expense", authentication.Authenticate, expense_Controller.getAll);

router.get(
  "/expense-period",
  authentication.Authenticate,
  expense_Controller.getAllExpenses
);

router.get(
  "/download",
  authentication.Authenticate,
  expense_Controller.expense_download
);

router.patch("/expense/:id", expense_Controller.update);

router.delete(
  "/expense/:id",
  authentication.Authenticate,
  expense_Controller.destroy
);

router.patch(
  "/total_expense",
  authentication.Authenticate,
  expense_Controller.leaderboard
);

module.exports = router;
