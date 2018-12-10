const knex = require('knex')(require('../db/dbconfig')) 
const lecturer= require('../models/lecturer')

const getResulft =async (req,res) =>{
  try{
      const {id,role}=req.sender
      const {course_id}=req.body
      let result 
      if (role==2)  result=await lecturer.getResulft(id,course_id)
      else throw new Error("this role wasn't allowed access")
      res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}


module.exports = {
	getResulft
}