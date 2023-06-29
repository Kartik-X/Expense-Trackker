const { order } = require("../models/index");
const { User, Expense } = require("../models/index");

const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
} = require("../config/serverConfig");

const Razorpay = require("razorpay");

const premium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, (err, orders) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

      req.user
        .createOrder({ orderId: orders.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({
            orders,
            key_id: rzp.key_id,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to purchase premium",
      err: error,
    });
  }
};

const Statusupdate = async (req, res) => {
  try {
    const { payment_id, order_id, status } = req.body;
    const updateOrder = order
      .findOne({ where: { orderId: order_id } })
      .then((orders) => {
        return orders.update({ paymentId: payment_id, status: status });
      })
      .catch((err) => {
        console.error(err, "123");
        return order
          .findOne({ where: { orderId: order_id } })
          .then((orders) => {
            return orders.update({ paymentId: payment_id, status: "Fail" });
          });
      });

    const updateUser = req.user.update({ ispremium: true });

    Promise.all([updateOrder, updateUser])
      .then(() => {
        return res.status(202).json({
          success: true,
          message: "Transaction successful",
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Error occurred during transaction",
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update status",
      err: error,
    });
  }
};

const leaderboard = async (req, res) => {
  try {
    const All_users = await User.findAll();
    let data = [];
    for (let i = 1; i <= All_users.length; i++) {
      const user = await User.findOne({
        where: {
          id: i,
        },
        include: Expense,
      });

      let sum = 0;

      user.Expenses.forEach((expense) => {
        sum = sum + Number(expense.expense_amount);
      });
      data.push({ user_name: user.username, sum, premium: user.ispremium });
      data.sort((a, b) => b.sum - a.sum);
    }

    return res.status(201).json({
      response: data,
      success: true,
      message: "Successfully created leaderboard",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update leaderboard",
      err: error,
    });
  }
};

module.exports = {
  premium,
  Statusupdate,
  leaderboard,
};
