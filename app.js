const express = require('express')
const app = express()
const router = require('./routes/index')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const path = require('path')
const logger = require('morgan')
const { verifyToken } = require('./routes/authConfig')
var session = require('express-session')
 require('./schema/mongoConfig')

const port = 4000; 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(session({
    secret: 'sumit123',
    resave: false,
    saveUninitialized: true
  }))

app.use('/',router)
app.use('/api',authRouter)
app.use('/api/user',verifyToken, userRouter)

app.listen(port,()=>{
    console.log('running on '+port)
})