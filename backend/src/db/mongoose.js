const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose.connect("mongodb://localhost:27018/Retro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

connection.once("open", () => {
  console.log(
    chalk`{blue.bold [INFO] MongoDB connection established successfully!}`
  );
});

module.exports = { mongoose };
