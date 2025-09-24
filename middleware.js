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

module.exports = {
    validateProduct,
    validateReview
};
