require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const dbConnetion = require('./Controllers/dbconnection_Controller')
const Auth = require('./Routes/authRoutes')

dbConnetion()
app.use(
    cors({
        origin: `https://audire-x.vercel.app`
    })
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/auth', Auth)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
})
