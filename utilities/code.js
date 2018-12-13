const bcrypt = require('bcrypt')

const encrypt=(str)=> {
  const salt = bcrypt.genSaltSync(10) 
  return bcrypt.hashSync(str, salt) 
}

const compare= (raw, hash)=> {
  return bcrypt.compareSync(raw, hash) 
}

module.exports = {
  compare,
  encrypt
}