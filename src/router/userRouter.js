const userRouter = require('express').Router();
const { login, register, getAllUsers, getUserCount } = require('../controller/userController');
const { authHandler, authorizeHandler } = require('../middleware/authHandler');



/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login
 *    tags: [Kullanıcı]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *    responses:
 *      200:
 *        description: Login successful
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal Server Error
 */
userRouter.post('/login', login)


/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register
 *    tags: [Kullanıcı]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - name
 *              - email
 *              - password
 *    responses:
 *      200:
 *        description: Register successful
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */
userRouter.post('/register', register)



userRouter.get('/getAll', authHandler, authorizeHandler, getAllUsers)
userRouter.get('/getUserCount', authHandler, getUserCount)


module.exports = userRouter;