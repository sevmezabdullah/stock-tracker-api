const jwt = require('jsonwebtoken');


const authHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401).json({ message: "Token bulunamadı" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).json({ message: "Token gecersiz" });
        req.user = user;
        next();
    })
}


const authorizeHandler = (req, res, next) => {
    const data = req.user;
    if (data.user.role === 'user') {
        next();
    } else if (data.user.role === 'admin') {
        return res.status(403).json({ message: "Yetkiniz yok" });
    } else {
        return res.status(403).json({ message: "Yetkiniz yok" });
    }
}

module.exports = {
    authHandler,
    authorizeHandler
}