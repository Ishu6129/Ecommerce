const express = require('express');
const router = express.Router();  //Mini instance of express app
const Review = require('../models/Review');
const Product = require('../models/Product');

router.post("/product/:id/reviews", async (req, res) => {
    try{
    let { id } = req.params;
    let {rating, comment } = req.body;
    const product = await Product.findById(id);
    const review = new Review({ rating, comment });
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/product/${id}`);}
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});

module.exports = router;