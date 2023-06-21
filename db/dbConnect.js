// external imports
const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
  try {
     await mongoose.connect(process.env.MONGODB_UR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     });
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;
