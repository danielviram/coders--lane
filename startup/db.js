//connention to mongodb
const mongoose = require("mongoose");
require('dotenv').config()

const db = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB 🚀!"))
    .catch((err) => console.log(err));
};

module.exports = db;
