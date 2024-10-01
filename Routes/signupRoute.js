const express = require('express')
const router = express.Router()
const User = require('../Schemas/User.js')
const checkValidity = require('../Controllers/signup_Controller.js')
const createUser = require('../Controllers/createUser_Controller.js')
const validationSchema = require('../Schemas/validationSchema.js')

router.post('/', async (req, res) => {
    console.log('Signup Accessed')
    const userData = req.body

    try {
        const value = await validationSchema.validateAsync(userData, { abortEarly: false })

        delete value.confirnPassword

        let response = await createUser(value);
        if (response) {
            const token = response.generateAuthToken()
            response = response.toObject()
            delete response.password
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
    } catch (error) {
        const errorMessages = error.details.map(err => err.message);
        
        res.status(400).send({
            message: null,
            error: errorMessages,
            data: null,
            token: null
        })
    }
})

module.exports = router;