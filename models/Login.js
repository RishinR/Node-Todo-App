const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true
    },
}); 

module.exports = new mongoose.model('Login', LoginSchema);