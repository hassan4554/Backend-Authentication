const express = require('express');
const router = express.Router();
const User = require('../Schemas/User.js');
const checkValidity = require('../Controllers/signup_Controller.js')
const createUser = require('../Controllers/createUser_Controller.js')

router.post('/', async (req, res) => {
    const userData = req.body;
    const validity = checkValidity(userData);

    if (validity.check1 != true) {
        res.status(400).send({
            message: null,
            error: validity.check1
        })
    } else if (validity.check2 != true) {
        res.status(400).send({
            message: null,
            error: validity.check2
        })
    } else {

        let response = await createUser(userData);
        if (response) {
            response = response.toObject();
            delete response.password;
            res.status(200).send({
                message: 'User created',
                error: null
            })
        } else {
            res.status(401).send({
                error: 'User Already Present',
                message: null
            })
        }
    }
})

module.exports = router;