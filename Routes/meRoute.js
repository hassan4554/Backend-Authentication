const router = require('express').Router()
const { User } = require('../Schemas/User')
const meMiddleware = require('../Middlewares/meMiddleware')

router.get('/', meMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })

    if (user) {
        const userObj = user.toObject();
        delete userObj.password
        return res.status(200).send({
            data: userObj,
            message: 'User Found',
            error: null
        })
    }

    return res.status(404).send({
        data: null,
        message: null,
        error: 'No User Found'
    })
})


module.exports = router;