const jwt = require('jsonwebtoken')

const generateAccessToken = async (user) => {
    const accessToken = await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    return accessToken
}


module.exports = {
    generateAccessToken
}