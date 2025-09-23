const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.render('products/index', { products });
  } catch (e) {
    next(e);
  }
});

router.get('/product/new', (req, res) => {
  res.render('products/new');
});

router.post('/products', async (req, res, next) => {
  try {
    const { name, price, image, description } = req.body;
    await Product.create({ name, price, image, description });
    res.redirect('/products');
  } catch (e) {
    next(e);
  }
});

router.get('/product/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render('products/show', { product });
  } catch (e) {
    next(e);
  }
});

router.get('/product/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render('products/edit', { product });
  } catch (e) {
    next(e);
  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, image, description } = req.body;
    await Product.findByIdAndUpdate(id, { name, price, image, description });
    res.redirect(`/product/${id}`);
  } catch (e) {
    next(e);
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
