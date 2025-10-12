const express = require('express');
const router = express.Router();  //Mini instance of express app
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateProduct,isLoggedIn,isSeller, isProdAuthor} = require('../middleware');

// All the routes related to products
router.get('/products',async (req, res) => {
    try{
        let products = await Product.find({});
        res.render('products/index', { products});
    }
    catch(e){
        res.status(500).render('error', {error: e.message});
    }
});

// Form to create new product
router.get('/product/new',isLoggedIn , async (req, res) => {
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error', {error: e.message});
    }
});

// Create new product
router.post('/products',isLoggedIn ,validateProduct,isSeller, async (req, res) => {
    try{
        let {name,price,image,description} = req.body;
        await Product.create({name,price,image,description,author:req.user._id} );
        req.flash("success","product added sucessfully")
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {error: e.message});
    }
});

// Show particular product
router.get('/product/:id',isLoggedIn , async (req, res) => {
    try{
        let {id} = req.params;
        let product = await Product.findById(id).populate('reviews');
        res.render('products/show', { product});
    }
    catch(e){
        res.status(500).render('error', {error: e.message});
    }
});

// Form to edit product
router.get('/products/:id/edit',isLoggedIn , async (req, res) => {
    try{
        let {id} = req.params;
        let product = await Product.findById(id);
        req.flash('success', 'Product Edited Successfully');
        res.render('products/edit', { product });
    }
    catch(e){
        res.status(500).render('error', {error: e.message});
    }
});

// Edit particular product
router.patch('/products/:id',isLoggedIn ,validateProduct,isSeller ,async (req, res) => {
    try{
        let {id} = req.params;
        let {name,price,image,description} = req.body;
        await Product.findByIdAndUpdate(id, {name,price,image,description});
        req.flash('success', 'Product Updated Successfully');
        res.redirect(`/product/${id}`);
}
    catch(e){
        res.status(500).render('error', {error: e.message});
    }
});

// Delete particular product
router.delete('/products/:id',isLoggedIn,isProdAuthor , async (req, res) => {
    try{
        let {id} = req.params;
        const product =await Product.findById(id);
        // for (let review of product.reviews) {
        //     await Review.findByIdAndDelete(review);
        // }
        await Product.findByIdAndDelete(id);
        req.flash('ono', 'Product Deleted Successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {error: e.message});
    }
});


module.exports = router;