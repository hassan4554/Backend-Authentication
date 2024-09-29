const express = require('express')
const router = express.Router()
const User = require('../Schemas/User.js')
const checkValidity = require('../Controllers/signup_Controller.js')
const createUser = require('../Controllers/createUser_Controller.js')

router.post('/', async (req, res) => {
    console.log('Signup Accessed')
    const userData = req.body
    const validity = checkValidity(userData)

    if (!validity.check1) {
        res.status(400).send({
            message: null,
            error: validity.check1,
            data: null,
            token: null
        })
    } else if (!validity.check2) {
        res.status(400).send({
            message: null,
            error: validity.check2,
            token: null,
            data: null
        })
    } else {

        let response = await createUser(userData);
        if (response) {
            const token = response.generateAuthToken()
            response = response.toObject();
            delete response.password;
            res.status(200).send({
                message: 'User created',
                error: null,
                data: response,
                token
            })
        } else {
            res.status(401).send({
                error: 'User Already Present',
                message: null,
                data: null,
                token: null
            })
        }
    }
})

module.exports = router;