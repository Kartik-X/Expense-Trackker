const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/serverConfig");
const userroute = require("./routes/v1-route");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", userroute);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
