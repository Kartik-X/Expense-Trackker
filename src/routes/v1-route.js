const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/Auth");

const signup_LoginController = require("../controllers/signup_login-controller");
const expense_Controller = require("../controllers/expense-controller");
const order_Controller = require("..//controllers/order-controller");

router.post("/sign-up", signup_LoginController.signup);

router.post("/login", signup_LoginController.login);

router.post("/expense", expense_Controller.create);
router.get("/expense", authentication.Authenticate, expense_Controller.getAll);
router.patch("/expense/:id", expense_Controller.update);
router.delete("/expense/:id", expense_Controller.destroy);

router.get("/premium", authentication.Authenticate, order_Controller.premium);

router.post(
  "/Statusupdate",
  authentication.Authenticate,
  order_Controller.Statusupdate
);

router.get(
  "/premiumcheck",
  authentication.Authenticate,
  expense_Controller.premium_check
);

module.exports = router;
