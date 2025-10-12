const { productSchema, reviewSchema } = require('./schemas.js');
const Product = require('./models/Product');

const validateProduct = (req, res, next) => {
    const { name, price, image, description } = req.body;
    const { error } = productSchema.validate({ name, price, image, description });
    if (error) {
        return res.status(400).render('error', { error: error.details[0].message });
    }
    next();
};

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        return res.status(400).render('error', { error: error.details[0].message });
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

const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('ono', 'You do not have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role!=="seller"){
        req.flash('ono', 'You do not have the permission to do that');
        return res.redirect('/products');
    }
    next();
}

const isProdAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product.author.equals(req.user._id)) {
        req.flash('ono', 'You do not have the permission to do that');
        return res.redirect('/products');
    }
    next();
}

module.exports = {
    validateProduct,
    validateReview,
    isLoggedIn,
    isSeller,
    isProdAuthor
};
