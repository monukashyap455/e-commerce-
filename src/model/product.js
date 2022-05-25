const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    title: { type: String, required: true, unique: true, },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    colour: { type: String },
    price: { type: Number, required: true },

}, { timestamps: true });

module.exports = mongoose.model('product', productSchema)