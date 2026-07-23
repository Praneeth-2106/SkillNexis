const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI || "YOUR_CONNECTION_STRING")
  .then(() => {
    console.log("Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });