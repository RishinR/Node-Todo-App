const router = require('express').Router();
const Login = require('../models/Login');
// routes
 
router.get('/', async (req, res)=>{
    const allLogin = await Login.find();
    res.render('login', {login: allLogin});
});
module.exports = router;