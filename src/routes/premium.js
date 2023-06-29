const express = require("express");
const router = express.Router();

const order_Controller = require("..//controllers/order-controller");
const expense_Controller = require("../controllers/expense-controller");
const authentication = require("../middlewares/Auth");

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
router.get("/premium-Lederboard", order_Controller.leaderboard);
module.exports = router;
