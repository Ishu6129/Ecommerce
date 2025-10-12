const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product=require("../models/Product")
const User=require("../models/User")


router.get('/user/cart' , isLoggedIn , async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price , 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart' , {user, totalAmount , productInfo });
})

// adding product to cart
router.post("/user/:productId/add",isLoggedIn,async (req,res)=>{
    const { productId } = req.params;
    const userId = req.user._id;
    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect("/user/cart");
})

module.exports = router;