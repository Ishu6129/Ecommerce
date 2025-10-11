const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product=require("../models/Product")
const User=require("../models/User")

//route to see cart
router.get("/user/cart", isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate("cart");
    res.render("cart/cart", { user });
});


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