const express = require('express');
const router = express.Router();  //Mini instance of express app
const Product = require('../models/Product');
const Review = require('../models/Review');


router.get('/products', async (req, res) => {
    let products = await Product.find({});
    res.render('products/index', { products });
});

router.get('/product/new', async (req, res) => {
    res.render('products/new');
});

router.post('/products', async (req, res) => {
    let {name,price,image,description} = req.body;
    await Product.create({name,price,image,description} );
    res.redirect('/products');
});


router.get('/product/:id', async (req, res) => {
    let {id} = req.params;
    let product = await Product.findById(id).populate('reviews');
    res.render('products/show', { product });
});

router.get('/product/:id/edit', async (req, res) => {
    let {id} = req.params;
    let product = await Product.findById(id);
    res.render('products/edit', { product });
});

router.patch('/products/:id', async (req, res) => {
    let {id} = req.params;
    let {name,price,image,description} = req.body;
    await Product.findByIdAndUpdate(id, {name,price,image,description});
    res.redirect(`/product/${id}`);
});

router.delete('/products/:id', async (req, res) => {
    let {id} = req.params;
    const product =await Product.findById(id);
    for (let review of product.reviews) {
        await Review.findByIdAndDelete(review);
    }
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});


module.exports = router;