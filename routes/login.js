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
// this get function check the user
router.get('/login/1', async (req, res)=>{
    const {email, password} = req.query;
    console.log(email, password);

    const userpass = await Login.findOne({"email": email}, {password:1});
    console.log(userpass);
    const passwordMatches = bcrypt.compareSync(password, userpass.password);

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