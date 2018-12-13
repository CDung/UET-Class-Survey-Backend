const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('knex')(require('../db/dbconfig')) 
const user= require('../models/user')
const admin =require('../models/admin')
const lecturer= require('../models/lecturer')
const student= require('../models/student')
const form= require('../models/form')
const code=require('../utilities/code')

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    await knex('users').where('username',username).then((result) => {
      if (result.length == 0) {
        throw new Error('Invalid username')
      }else{
        const user=result[0]
        const match = code.compare(password, user.password)
        if (match) {
          const token = jwt.sign({
            id: user.id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRES_IN 
          })
          res.send({
            token,
            expiresIn: process.env.TOKEN_EXPIRES_IN,
            id: user.id,
            role: user.role
          })
          
        } else {
          throw new Error('Invalid password')
        }
      } 
    })
  }catch (error) {
    res.status(401).send({message: error.message})
  }
}

const getProfile =async (req,res) =>{
  try{
    const {id,role}=req.sender
    let result 
    if (role==1)  result=await admin.getProfile(id)
    else if (role==2)  result=await lecturer.getProfile(id)
    else if (role==3)  result=await student.getProfile(id)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const getCourses =async (req,res) =>{
  try{
    const {id,role}=req.sender
    let result 
    if (role==1)  result=await admin.getCourses() 
    else if (role==2)  result=await lecturer.getCourses(id)
    else if (role==3)  result=await student.getCourses(id)
    else throw new Error("this role wasn't allowed access")  
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const getForm =async (req,res) =>{
  try{
    const {id,role}=req.sender
    let result 
    if (role==1 ||role==3)  result=await form.getForm()
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}


module.exports = {
  login,
  getProfile,
  getCourses,
  getForm,
}