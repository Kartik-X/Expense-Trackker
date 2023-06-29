const { order } = require("../models/index");
const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
} = require("../config/serverConfig");

const Razorpay = require("razorpay");

const premium = async (data) => {
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

      data.user
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

module.exports = {
  premium,
};
