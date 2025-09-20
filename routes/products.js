const express = require('express');
const router = express.Router();  //Mini instance of express app
const Product = require('../models/Product');


router.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
});





module.exports = router;