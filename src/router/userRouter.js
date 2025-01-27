const userRouter = require('express').Router();
const { login, register, getAllUsers, getUserCount } = require('../controller/userController');
const { authHandler, authorizeHandler } = require('../middleware/authHandler');
userRouter.post('/login', login)
userRouter.post('/register', register)

userRouter.get('/getAll', authHandler, authorizeHandler, getAllUsers)
userRouter.get('/getUserCount', authHandler, getUserCount)


module.exports = userRouter;