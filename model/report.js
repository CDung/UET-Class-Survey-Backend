const knex = require('knex')(require('../dbconfig')) 

module.exports={
	postReport :async function (course_id,id,points) {
        try {
        	for (var i=0; i < points.length; i++)
        			await knex('reportofstudent').insert({'course_id':course_id,'id':id,'criteria_id':points[i].criteria_id,'point':points[i].point})
          	await knex('studentsofcourse').where({'id':id,'course_id':course_id}).update({'done': '1'})
          	return Promise.resolve({success: true})
        } catch (err) {
          	return Promise.reject(new Error(err))
        }
    },
}