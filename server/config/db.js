const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      //"mongodb://127.0.0.1:27017/myContacts"
      "mongodb+srv://pvthafzi:mOwi19YpYAiKCNyt@cluster0.f5y5gwf.mongodb.net/myContacts?retryWrites=true&w=majority"
    );
    console.log("database connected at host:" + connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

//mOwi19YpYAiKCNyt
