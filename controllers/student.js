const knex = require('knex')(require('../db/dbconfig')) 
const student= require('../models/student')

const postReport =async (req,res) =>{
  try{
    const {id,role}=req.sender
    const {course_id,points}=req.body
    let result 
    if (role==3)  result=await student.postReport(course_id,id,points)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}


module.exports = {
	postReport
}