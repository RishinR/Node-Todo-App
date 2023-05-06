const router = require('express').Router();
const Login = require('../models/Login');
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
    const user = await Login.find({"email": email, "password": password})
    console.log(user)
    if (user){
        console.log('Logged in successfully');
        res.render('dashboard');
    }
    else{
        console.log('Invalid user');
        res.redirect('/');
    }
});
module.exports = router;