const express = require('express');
const router = express.Router();  //Mini instance of express app
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateProduct} = require('../middleware');


router.get('/products', async (req, res) => {
    try{
        let products = await Product.find({});
        res.render('products/index', { products });
    }
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});

router.get('/product/new', async (req, res) => {
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});

router.post('/products',validateProduct, async (req, res) => {
    try{
        let {name,price,image,description} = req.body;
        await Product.create({name,price,image,description} );
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});


router.get('/product/:id', async (req, res) => {
    try{
        let {id} = req.params;
        let product = await Product.findById(id).populate('reviews');
        res.render('products/show', { product });
    }
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});

router.get('/product/:id/edit', async (req, res) => {
    try{
        let {id} = req.params;
        let product = await Product.findById(id);
        res.render('products/edit', { product });
    }
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});

router.patch('/products/:id',validateProduct ,async (req, res) => {
    try{
        let {id} = req.params;
        let {name,price,image,description} = req.body;
        await Product.findByIdAndUpdate(id, {name,price,image,description});
        res.redirect(`/product/${id}`);
}
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});

router.delete('/products/:id', async (req, res) => {
    try{
        let {id} = req.params;
        const product =await Product.findById(id);
        // for (let review of product.reviews) {
        //     await Review.findByIdAndDelete(review);
        // }
        await Product.findByIdAndDelete(id);
    res.redirect('/products');
}
    catch(e){
        res.status(500).render('products/error', {error: e.message});
    }
});


module.exports = router;