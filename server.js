require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const dbConnetion = require('./Controllers/dbconnection_Controller')
const Signup = require('./Routes/signup')
const Login = require('./Routes/login')
const ProtectedRoute = require('./Routes/protectedRoute')

dbConnetion()
// app.use(cors())
app.use(
    "*",
    cors({
        origin: `https://audire-x.vercel.app/`,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/auth/signup', Signup)
app.use('/auth/login', Login)
app.use('/auth/protected-route', ProtectedRoute)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
})
