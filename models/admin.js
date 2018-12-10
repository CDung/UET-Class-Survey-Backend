const knex = require('knex')(require('../db/dbconfig')) 
const user= require('./user')

const getProfile= async (id)=> {
  try {
    const result = await knex('admins').where('id', id)
    if (result.length == 0) return new Error("not found")
    return Promise.resolve({avatar: await user.getAvatar(id), role:1,fullname:result[0].fullname,vnuemail : result[0].vnuemail})
  } catch (err) {
    throw err
  }
}

const getCourses= async ()=> {
  try { 
    const result = await knex('coursesoflecturers').select('course_id','id','fullname','subject')
    if (result.length == 0) return new Error("not found or not have course")
    return result
  } catch (err) {
    throw err
  }
}

const getResulftById= async (id,course_id)=> {
  try { 
    const result = await knex('resulft').where({'id' :id,'course_id':course_id }).select('criteria_id','criteria','M','STD','M1','STD1','M2','STD2').orderBy('criteria_id')
    if (result.length == 0) return new Error("not found or not have result")
    return result
  } catch (err) {
    throw err
  }
}

const getAllStudents= async ()=> {
  try { 
    const result = await knex.select('users.id','users.username','students.fullname','students.vnuemail','students.classname').from('users').rightJoin('students','users.id','students.id')
    if (result.length == 0) return new Error("not found or not have student")
    return result
  } catch (err) {
    throw err
  }
}

module.exports = {
  getProfile,
  getCourses,
  getResulftById,
  getAllStudents
}