const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Sib = require("sib-api-v3-sdk");
const config = require("./config.json");

dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

config.development.username = process.env.DB_USERNAME;
config.development.password = process.env.DB_PASSWORD;
config.development.database = process.env.DB_NAME;
config.development.host = process.env.DB_HOST;

module.exports = {
  PORT: process.env.PORT || 5000,
  SALT: bcrypt.genSaltSync(10),
  JWT_KEY: process.env.JWT_KEY,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  Bucket_Name: process.env.BUCKET_NAME,
  I_Am_UserKey: process.env.IAM_USER_KEY,
  I_Am_userSecret: process.env.IAM_USER_SECRET,
  SYNC_DB: process.env.SYNC_DB,
};
