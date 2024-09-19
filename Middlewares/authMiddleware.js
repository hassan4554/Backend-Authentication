const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).send({
            message: 'Access Denied. No Token Provided'
        })
    }

    try {
        const decode = jwt.verify(token, process.env.PRIVATEKEY);
        req.user = decode;
        next();

    } catch (error) {
        res.status(400).send({
            message: 'Invalid Token'
        })
    }
}

module.exports = authMiddleware