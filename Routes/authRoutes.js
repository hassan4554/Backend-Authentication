const router = require('express').Router()

const Signup = require('./signupRoute')
const Login = require('./loginRoute')
const ProtectedRoute = require('./protectedRoute')
const Me = require('./meRoute')

router.use('/signup', Signup)
router.use('/login', Login)
router.use('/protected-route', ProtectedRoute)
router.use('/me', Me)


module.exports = router