const mongoose = require('mongoose');

const joi = require('joi');

const productSchema = new mongoose.Schema({
    productName: String,
    stock: Number,
    country: String,
    expireDate: Date,
    color: String,
    weight: Number
});


const validateProduct = (product) => {
    const schema = joi.object({
        productName: joi.string().min(3).max(30).required("Ürün adı zorunludur").messages({
            "any.required": "Ürün adı zorunludur",
            "string.min": "Ürün adı en az 3 karakter olmalıdır",
            "string.max": "Ürün adı en fazla 30 karakter olmalıdır"
        }),
        stock: joi.number().required(),
        country: joi.string().required(),
        expireDate: joi.date().required(),
        color: joi.string().required(),
        weight: joi.number().min(0).required()
    })
    return schema.validate(product)
}

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    validateProduct
}