const jwt = require('jsonwebtoken')

const meMiddleware = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]

    if (token == 'null') {
        return res.status(403).send({
            error: 'Access Denied! No token Provided',
            message: null,
            data: null
        })
    }

    try {
        const decode = jwt.verify(token, process.env.PRIVATEKEY)
        req.user = decode
        next()
    } catch (error) {
        return res.status(400).send({
            error: 'Invalid Token',
            message: null,
            data: null
        })
    }
}

module.exports = meMiddleware