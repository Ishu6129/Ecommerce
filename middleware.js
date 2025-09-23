const {productSchema, reviewSchema} = require('./schemas.js');

const validateProduct = (req, res, next) => {
    let {name, price, image, description} = req.body;
    const {error}=productSchema.validateAsync({name, price, image, description})
    if(error){
        res.status(400).render('products/error', {error: error.details[0].message});
    }
    next();
}

const validateReview = (req, res, next) => {
    let {rating, comment} = req.body;
    const {error}=reviewSchema.validateAsync({rating, comment})
    if(error){
        res.status(400).render('products/error', {error: error.details[0].message});
    }
    next();
}
module.exports = {
    validateProduct,
    validateReview
};