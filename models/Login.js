const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
}); 

module.exports = new mongoose.model('Login', LoginSchema);