const joi = require('joi')
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*,.]).{8,}$/

const validationSchema = joi.object({
    username: joi.string().alphanum().min(5).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).pattern(new RegExp(passwordPattern)).required(),
    confirmPassword: joi.ref('password')
})

module.exports = validationSchema