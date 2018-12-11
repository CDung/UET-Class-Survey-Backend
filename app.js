require('./config/config.js')
// require('./db/seed')
const morgan = require('morgan')
const express = require('express') 
const app = express() 
const bodyParser = require('body-parser')
const router = require('./router/router')
const port = process.env.port

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use((req, res, next) => {   
  res.header('Access-Control-Allow-Origin', '*') 
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Authorization') 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  next() 
})  
app.use(express.static('./public/')) 
app.use('/api', router)
app.listen(port, () => {
  console.log('Server is up on port ', port)
})