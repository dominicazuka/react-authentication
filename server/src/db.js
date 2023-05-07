const mongoose = require("mongoose");

let client;

export const initializeDbConnection = async () => {
  try {
    const mongo_db_url = process.env.MONGODB_URI;
    client = await mongoose.connect(mongo_db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection Successfully Initiated...");
  } catch (error) {
    console.log(error.message);
  }
};