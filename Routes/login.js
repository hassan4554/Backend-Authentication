const express = require('express')
const router = express.Router()
const { User } = require('../Schemas/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    console.log('Login Accessed');

    try {
        const data = req.body;
        let user = await User.findOne({ email: data.email });

        if (user) {
            const validPassword = await bcrypt.compare(data.password, user.password);
            if (validPassword) {
                const token = user.generateAuthToken();

                res.status(200).send({
                    message: 'Logged In',
                    error: null,
                    token
                })
            }
        } else {
            res.status(404).send({
                message: null,
                error: 'Invalid Email or Password',
                token: null
            })
        }
    } catch (error) {
        res.status(500).send({
            message: null,
            error,
            token: null
        })
    }
})

module.exports = router;