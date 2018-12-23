const knex = require('knex')(require('../db/dbconfig')) 
const user= require('./user')

const getProfile= async (id)=> {
  try {
    const result = await knex('students').where('id', id)
    if (result.length == 0) throw new Error("Not found ")
    return Promise.resolve({avatar: await user.getAvatar(id), role:3,fullname:result[0].fullname,vnuemail : result[0].vnuemail,classname: result[0].classname})
  } catch (err) {
    throw err
  }
}

const getCourses= async (id)=> {
  try { 
    const result = await knex('coursesofstudents').where('id', id).select('done','course_id','subject','lecturer')
    if (result.length == 0) throw new Error("Not found or not have course")
    return result
  } catch (err) {
    throw err
  }
}

const postReport=async(course_id,id,points)=>{
  try { 
    for (var i=0; i < points.length; i++)
      await knex('reportofstudent').insert({'course_id':course_id,'id':id,'criteria_id':points[i].criteria_id,'point':points[i].point})
    await knex('studentsofcourse').where({'id':id,'course_id':course_id}).update({'done': '1'})
    return "OK"
  } catch (err) {
    throw err
  }
}


module.exports = {
  getProfile,
  getCourses,
  postReport,
}