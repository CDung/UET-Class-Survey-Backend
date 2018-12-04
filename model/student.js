const knex = require('knex')(require('../dbconfig')) 
const user= require('../model/user')

module.exports = {
    getProfile: async function (id) {
        try {
          const result = await knex('students').where('id', id)
          if (result.length == 0) return Promise.reject(new Error("id is not exit"))
          return Promise.resolve({success: true, avatar: await user.getAvatar(id), role:3,fullname:result[0].fullname,vnuemail : result[0].vnuemail,classname: result[0].classname})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },

    getCourses: async function (id) {
        try { 
        const result = await knex('coursesofstudents').where('id', id).select('done','course_id','subject','lecturers')
        if (result.length == 0) return Promise.reject(new Error("id is not exit"))
        return Promise.resolve({success: true, courses:result})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },

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

    getAllStudents : async function(){
      try {
          const result = await knex.select('users.username','students.fullname','students.vnuemail','students.classname').from('users').rightJoin('students','users.id','students.id')
          return Promise.resolve({success: true, 'result':result})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },

    

}