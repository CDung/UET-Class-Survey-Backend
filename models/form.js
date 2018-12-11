const knex = require('knex')(require('../db/dbconfig')) 

const getForm= async ()=> {
  try { 
    const result = await knex('surveyform').orderBy('id')
    if (result.length == 0) throw new Error("not found or form is null")
    return result
  } catch (err) {
    throw err
  }
}

module.exports = {
  getForm,  
}