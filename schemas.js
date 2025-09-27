// Schema for server side validation
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().required(),
    description: Joi.string().min(10).required()
})

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(2).required()
})


module.exports = {
    productSchema,
    reviewSchema
};