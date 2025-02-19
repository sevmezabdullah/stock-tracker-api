const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../../utils/token');
const { getUserByEmail, createUser, getAllUsers, getUserCount } = require('./userRepository');
const { sendVerificationEmail } = require('../../utils/email');

const loginService = async (email, password) => {
    const user = await getUserByEmail(email)
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Sifre yanlış" })
        }
        user.password = undefined
        user.name = undefined
        const accessToken = await generateAccessToken(user)
        return accessToken
    }
    return null
}

const registerUserService = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(name, email, hashedPassword)
    await sendVerificationEmail(email, "Hoşgeldiniz", name, "1234567")
    return user
}

const getAllUsersService = async () => {
    const users = await getAllUsers()
    return users
}

const getUserCountService = async () => {
    return await getUserCount()
}


module.exports = {
    loginService,
    registerUserService,
    getAllUsersService,
    getUserCountService
}

