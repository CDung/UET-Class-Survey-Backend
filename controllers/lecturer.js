const knex = require('knex')(require('../db/dbconfig')) 
const lecturer= require('../models/lecturer')

const getResult =async (req,res) =>{
  try{
    const {id,role}=req.sender
    const {course_id}=req.body
    let result 
    if (role==2)  result=await lecturer.getResult(id,course_id)
    else throw new Error("This role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}


module.exports = {
	getResult
}