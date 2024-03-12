const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const ratingSchema = new Schema({
    rate: Number,
    count: Number,
})


const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true,
    },
    description: String,
    category: {
        type: String,
        enum: ["men's clothing", "jewelery", "electronics"]
    },
    image: String,
    rating: ratingSchema
})

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;