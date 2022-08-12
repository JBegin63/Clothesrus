require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("./config/mongoose.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

require("./routes/user.routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`You are connected to port ${process.env.PORT}`);
});
