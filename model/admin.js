const knex = require('knex')(require('../dbconfig')) 
const user= require('../model/user')

module.exports = {

    getCourses: async function (id) {
        try { 
        const result = await knex('coursesoflecturers').select('course_id','id','fullname','subject')
        if (result.length == 0) return Promise.reject(new Error("id is not exit"))
        return Promise.resolve({success: true, courses:result})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },

    getProfile: async function (id) {
        try {
          const result = await knex('admins').where('id', id)
          if (result.length == 0) return Promise.reject(new Error("id is not exit"))
          return Promise.resolve({success: true, avatar: await user.getAvatar(id), role:1,fullname:result[0].fullname,vnuemail : result[0].vnuemail})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },

    getResulftById : async function (id,course_id) {
        try {
          const result = await knex('resulft').where({'id' :id,'course_id':course_id }).select('criteria_id','criteria','M','STD','M1','STD1','M2','STD2').orderBy('criteria_id')
          if (result.length == 0) return Promise.reject(new Error("id is not exit"))
          return Promise.resolve({success: true, 'result':result})
        } catch (err) {
          return Promise.reject(new Error(err))
        }
    },
}