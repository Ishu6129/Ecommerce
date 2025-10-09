const express = require('express');
const router = express.Router();
const User=require('../models/user')


router.get('/register',(req,res)=>{
    res.render("auth/signup")
})

router.post('/register',async(req,res)=>{
    let {email,username,password} = req.body;
    const user=new User({email,username});
    const newuser=await User.register(user,password);
    res.send(newuser);
});

module.exports = router; 