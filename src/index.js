const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const { PORT, SYNC_DB } = require("./config/serverConfig");
const expense = require("./routes/expense");
const signup_login = require("./routes/signup_login");
const premium = require("./routes/premium");
const path = require("path");
const db = require("./models/index");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(helmet());
//app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", expense);
app.use("/", signup_login);
app.use("/", premium);

app.listen(PORT, async () => {
  console.log(`Server is running on port:${PORT}`);

  if (SYNC_DB) {
    db.sequelize.sync({ alter: true });
  }
});
