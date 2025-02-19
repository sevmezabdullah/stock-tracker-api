const { User } = require("./userSchema")

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}
const createUser = async (name, email, password) => {
    const newUser = new User({ name, email, password })
    await newUser.save()
    return newUser
}
const getAllUsers = async () => {
    const users = await User.find()
    return users
}
const getUserCount = async () => {
    const count = await User.countDocuments()
    return count
}
module.exports = {
    getUserByEmail,
    createUser,
    getAllUsers,
    getUserCount
}