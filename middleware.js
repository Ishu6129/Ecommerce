const { productSchema, reviewSchema } = require('./schemas.js');

const validateProduct = (req, res, next) => {
    const { name, price, image, description } = req.body;
    const { error } = productSchema.validate({ name, price, image, description });
    if (error) {
        return res.status(400).render('products/error', { error: error.details[0].message });
    }
    next();
};

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        return res.status(400).render('products/error', { error: error.details[0].message });
    }
    next();
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('ono', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};

module.exports = {
    validateProduct,
    validateReview,
    isLoggedIn
};
