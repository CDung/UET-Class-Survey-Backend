const knex = require('knex')(require('../dbconfig')) 
const user= require('../model/user')

module.exports = {

    getCourses: async function (id) {
        try { 
        const result = await knex('coursesofstudents').where('id', id).select('done','course_id','subject','lecturers')
        if (result.length == 0) return Promise.reject(new Error("id is not exit"))
        return Promise.resolve({success: true, courses:result})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },

    getProfile: async function (id) {
        try {
          const result = await knex('students').where('id', id)
          if (result.length == 0) return Promise.reject(new Error("id is not exit"))
          return Promise.resolve({success: true, avatar: await user.getAvatar(id), role:3,fullname:result[0].fullname,vnuemail : result[0].vnuemail,classname: result[0].classname})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },

    }