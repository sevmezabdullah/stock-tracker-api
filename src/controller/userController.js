
const { User } = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/token');
const { sendEmail, sendVerificationEmail } = require('../utils/email');

async function login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" })
    }

    console.debug("🚀 ~ login ~ user:", user)
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
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedPassword })
        /* await sendEmail(email, "Hoşgeldiniz", "Hoşgeldiniz, Sisteme kayıt oldunuz,1000000. kişisiniz tebrikler.") */
        await sendVerificationEmail(email, "Hoşgeldiniz", name, "1234567")
        await user.save()
        return res.status(201).json({ message: "Kullanıcı oluşturuldu" })
    } catch (error) {

        console.debug("🚀 ~ register ~ error:", error)
        return res.status(500).json({ message: "Kullanıcı oluşturulamadı" })

    }

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