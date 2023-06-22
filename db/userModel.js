const mongoose = require("mongoose");
require("dotenv").config();
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
    
  })
  //module.exports = mongoose.model.cosmas001 || mongoose.model("cosmas001", UserSchema);

  module.exports = mongoose.model("User", UserSchema);