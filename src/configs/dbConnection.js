const mongoose = require("mongoose");

const dbConnection = function () {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Db Connected"))
    .catch(() => console.log("Db not connected"));
};

module.exports = {
  mongoose,
  dbConnection,
};
