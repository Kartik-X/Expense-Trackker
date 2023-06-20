const express = require("express");
const router = express.Router();

const signup_LoginController = require("../controllers/signup_login-controller");
const expense_Controller = require("../controllers/expense-controller");

router.post("/sign-up", signup_LoginController.signup);

router.post("/login", signup_LoginController.login);

router.post("/expense", expense_Controller.create);
router.get("/expense", expense_Controller.getAll);
router.patch("/expense/:id", expense_Controller.update);
router.delete("/expense/:id", expense_Controller.destroy);

module.exports = router;
