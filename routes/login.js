const router = require('express').Router();
const Login = require('../models/Login');
const saltRounds = 10;
const bcrypt = require("bcrypt");
// routes
// this get fetches the login page
router.get('/login', async (req, res)=>{
    console.log('hello world');
    res.render(await 'login');
});
// this get function does the user validation
router.get('/login/1', async (req, res)=>{
    // get user input data using req.query
    const {email, password} = req.query;
    console.log(email, password);
    // userpass will be a json file containg _id and hashedpassword
    const userpass = await Login.findOne({"email": email}, {password:1});
    console.log(userpass);
    // compare hashedpassword with the input string
    const passwordMatches = bcrypt.compareSync(password, userpass.password);
    // if comparison returns true open dashboard
    // else redirect to login
    console.log(passwordMatches)
    if (passwordMatches){
        console.log('Logged in successfully');
        res.render('dashboard');
    }
    else{
        console.log('Invalid user');
        res.redirect('/login');
    }
});
module.exports = router;