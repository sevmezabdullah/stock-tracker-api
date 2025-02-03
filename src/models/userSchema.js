const mongoose = require('mongoose');
const joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
});

const validateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
        role: joi.string().valid("user", "admin").required()
    })
    return schema.validate(user)
}


const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    validateUser
}