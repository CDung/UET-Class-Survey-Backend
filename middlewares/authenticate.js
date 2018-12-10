const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  var token = req.headers['authorization'] 
  try {
    await jwt.verify(token, process.env.JWT_SECRET)
    req.sender = jwt.decode(token)
    next()
  } catch (e) {
    res.status(401).send({message: e.message})
  }
}

module.exports = {
  authenticate
}