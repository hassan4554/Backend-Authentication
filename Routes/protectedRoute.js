const authMiddleware = require('../Middlewares/authMiddleware');

const router = require('express').Router()

router.get('/', authMiddleware, (req, res) => {
    res.send({
        message: 'This is a protected route',
        user: req.user
    })
})

module.exports = router;
