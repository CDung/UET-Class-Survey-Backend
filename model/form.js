const knex = require('knex')(require('../dbconfig')) 

module.exports={
	getForm :async function () {
        try {
          const result = await knex('surveyform').orderBy('criteria_id')
          if (result.length == 0) return Promise.reject(new Error("not exit form"))
          return Promise.resolve({success: true,form:result} )
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },
}