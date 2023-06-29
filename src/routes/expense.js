const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/Auth");

const expense_Controller = require("../controllers/expense-controller");

router.post("/expense", expense_Controller.create);
router.get("/expense", authentication.Authenticate, expense_Controller.getAll);
router.patch("/expense/:id", expense_Controller.update);
router.delete("/expense/:id", expense_Controller.destroy);

module.exports = router;
