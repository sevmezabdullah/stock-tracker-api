
const { loginService, registerUserService, getAllUsersService, getUserCountService } = require('./userService');



async function login(req, res) {
    const { email, password } = req.body
    const result = await loginService(email, password)
    if (!result) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" })
    }
    return res.status(200).json({ result })
}

async function register(req, res) {
    const { name, email, password } = req.body
    try {
        const user = await registerUserService(name, email, password)
        if (user) {
            return res.status(201).json({ message: "Kullanıcı oluşturuldu" })
        } else {
            return res.status(400).json({ message: "Kullanıcı oluşturulamadı" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Kullanıcı oluşturulamadı" })
    }

}

async function getAllUsers(req, res) {
    const users = await getAllUsersService()
    return res.status(200).json({ users })
}

async function getUserCount(req, res) {
    const count = await getUserCountService()
    return res.status(200).json({ count })
}


module.exports = {
    login,
    register,
    getAllUsers,
    getUserCount
}