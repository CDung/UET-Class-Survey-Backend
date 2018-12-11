const knex = require('knex')(require('../db/dbconfig')) 
const host="localhost:3000"

const getAvatar= async (id)=> {
  try {
    const result = await knex(`users`).where('id', id)
    if (result.length == 0) throw new Error("not found")
    return host+result[0].avatar
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAvatar,  
}