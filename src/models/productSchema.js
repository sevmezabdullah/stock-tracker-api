const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    stock: Number,
    country: String,
    expireDate: Date,
    color: String,
    weight: Number
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product