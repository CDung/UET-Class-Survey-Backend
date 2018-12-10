const knex = require('knex')(require('../db/dbconfig')) 
const admin= require('../models/admin')
const student= require('../models/student')
const lecturer= require('../models/lecturer')
const form= require('../models/form')

const getResulftById =async (req,res) =>{
  try{
      const {role}=req.sender
      const {id,course_id}=req.body
      let result 
      if (role==1)  result=await admin.getResulftById(id,course_id)
      else throw new Error("this role wasn't allowed access")
      res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const getAllStudents =async (req,res) =>{
  try{
      const {role}=req.sender
      let result 
      if (role==1)  result=await student.getAllStudents()
      else throw new Error("this role wasn't allowed access")
      res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const getAllLecturers =async (req,res) =>{
  try{
      const {role}=req.sender
      let result 
      if (role==1)  result=await lecturer.getAllLecturers()
      else throw new Error("this role wasn't allowed access")
      res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

module.exports = {
  getResulftById,
  getAllStudents,
  getAllLecturers,
}