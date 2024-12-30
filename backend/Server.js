const express = require("express"); //web server framework , lightweight, fast, efficient
const mongoose = require("mongoose"); //mongo odb
const dotenv = require("dotenv"); //to load environment variables
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config(); //load env variables from .env file, use process.env.variable-name
const app = express(); //intialised express app

app.use(express.json()); //to parse incoming json data
app.use(cors()); //enable cors to allow frontend communication

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.error("mongo error", err));

app.use("/employees-route", employeeRoutes);

// console.log(process.env.MONGO_URI, process.env.PORT);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
