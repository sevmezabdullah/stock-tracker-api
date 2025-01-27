
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/token');

async function login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Sifre yanlış" })
    }
    user.password = undefined
    user.name = undefined
    const accessToken = await generateAccessToken(user)
    return res.status(200).json({ accessToken })
}

async function register(req, res) {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    return res.status(201).json({ message: "Kullanıcı oluşturuldu" })
}

async function getAllUsers(req, res) {
    const users = await User.find()
    return res.status(200).json({ users })
}

async function getUserCount(req, res) {
    const count = await User.countDocuments()
    return res.status(200).json({ count })
}


module.exports = {
    login,
    register,
    getAllUsers,
    getUserCount
}