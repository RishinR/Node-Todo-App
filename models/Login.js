const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // name:{
  //     firstname:{
  //         type:String,
  //         required:true
  //     },
  //     middlename:{
  //         type:String,
  //         required:true
  //     },
  //     lastname:{
  //         type:String,
  //         required:true
  //     }
  // }
});

module.exports = new mongoose.model("Login", LoginSchema);
