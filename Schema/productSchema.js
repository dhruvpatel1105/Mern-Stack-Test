const Joi = require('joi');

const   productSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description:Joi.string().min(10),
    category: Joi.string().valid("men's clothing", "jewelery", "electronics"),
    image: Joi.string(),
    rating: Joi.object({
        rate:  Joi.number(),
        count: Joi.number()
    })
})

module.exports = productSchema;