const knex = require('knex')(require('../dbconfig')) 

module.exports={
	getForm :async function () {
        try {
          	const result = await knex('surveyform').orderBy('id')
          	if (result.length == 0) return Promise.reject(new Error("not exit form"))
          	return Promise.resolve({success: true,form:result} )
        } catch (err) {
          	return Promise.reject(new Error(err))
        }
    },

    deleteCriteria : async function(id){
        try {
            await knex('reportofstudent').where({"criteria_id": id}).del()
            await knex('surveyform').where({"id": id}).del()
        } catch (err) {
        return Promise.reject(err)
      }
    } ,

    createCriteria : async function(criteria){
        try {
            await knex('surveyform').insert({"criteria":criteria})
        } catch (err) {
        return Promise.reject(err)
      }
    } ,

    editCriteria : async function(id,criteria){
        try {
            await knex('surveyform').where("id", id).update("criteria",criteria)
        } catch (err) {
        return Promise.reject(err)
      }
    } ,
}