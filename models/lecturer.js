const knex = require('knex')(require('../db/dbconfig')) 
const user= require('./user')

const getProfile= async (id)=> {
  try {
    const result = await knex('lecturers').where('id', id)
    if (result.length == 0) throw new Error("not found")
    return Promise.resolve({avatar: await user.getAvatar(id), role:2,fullname:result[0].fullname,vnuemail : result[0].vnuemail})
  } catch (err) {
    throw err
  }
}

const getCourses= async (id)=> {
  try { 
    const result = await knex('coursesoflecturers').where('id', id).select('course_id','subject')
    if (result.length == 0) throw new Error("not found or not have course")
    return result
  } catch (err) {
    throw err
  }
}

const getResult=async (id,course_id)=>{
  try {
    const surveyInfo =await knex('surveyinfo').where({'id' :id,'course_id':course_id })
  	const resultTable= await knex('result').where({'id' :id,'course_id':course_id }).select('criteria_id','criteria','M','STD','M1','STD1','M2','STD2').orderBy('criteria_id')
    if (resultTable.length == 0 && surveyInfo.length == 0) throw new Error("not found or not have survey info and result table")
    if (surveyInfo.length == 0) throw new Error("not found or not have survey info ")
    return {"surveyInfo":surveyInfo[0],"resultTable":resultTable}
  } catch (err) {
    throw err
  }
}


module.exports = {
  getProfile,
  getCourses,
  getResult,
}