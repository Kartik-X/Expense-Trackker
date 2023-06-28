const { order } = require("../models/index");

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

module.exports = {
  premium,
  Statusupdate,
};
