const { login } = require("../controllers/signup_login-controller");
const ExpenseRepository = require("../repository/expense-repository");
const {
  Bucket_Name,
  I_Am_UserKey,
  I_Am_userSecret,
} = require("../config/serverConfig");
const AWS = require("aws-sdk");

class ExpenseService {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  #uploadToS3(data, filename) {
    const BUCKET_NAME = Bucket_Name;
    const IAM_USER_KEY = I_Am_UserKey;
    const IAM_USER_SECRET = I_Am_userSecret;

    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });

    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, response) => {
        if (err) {
          console.log("Something went wrong during file uploading");
          reject(err);
        } else {
          console.log("Success", response);
          resolve(response.Location);
        }
      });
    });
  }

  async createdata(data) {
    try {
      const expense = await this.expenseRepository.createdata(data);
      return expense;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async getdata(userId, pageNum, limitNum) {
    try {
      const expense = await this.expenseRepository.getdata(
        userId,
        pageNum,
        limitNum
      );
      return expense;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }
  async PeriodData(data) {
    try {
      const expense = await this.expenseRepository.PeriodData(data);
      return expense;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }
  async expense_download(data) {
    try {
      const expenses = await this.expenseRepository.PeriodData(data);
      const userId = data.user.id;
      const stringified_expense = JSON.stringify(expenses);
      const filename = `Expense${userId}/${new Date()}.txt`;
      const fileUrl = await this.#uploadToS3(stringified_expense, filename);

      return fileUrl;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async updatedata(userid, data) {
    try {
      const resource = await this.expenseRepository.updatedata(userid, data);
      return resource;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async deletedata(userid, amount, user) {
    try {
      user.Total_Expense = user.Total_Expense - Number(amount);

      const response = await this.expenseRepository.deletedata(userid, user);
      return response;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }

  async updateexpense(user, data) {
    try {
      let userId = user.id;
      let amount = data.expense_amount;

      if (user.Total_Expense == undefined) {
        user.Total_Expense = amount;
      } else {
        user.Total_Expense = user.Total_Expense + Number(amount);
      }

      const expense = await this.expenseRepository.updateexpense(userId, user);
      return expense;
    } catch (error) {
      console.log("Something went wrong at Service layer");
      throw { error };
    }
  }
}

module.exports = ExpenseService;
