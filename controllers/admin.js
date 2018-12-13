const knex = require('knex')(require('../db/dbconfig')) 
const admin= require('../models/admin')
const student= require('../models/student')
const lecturer= require('../models/lecturer')
const form= require('../models/form')

const getResultById =async (req,res) =>{
  try{
    const {role}=req.sender
    const {id,course_id}=req.body
    let result 
    if (role==1)  result=await admin.getResultById(id,course_id)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const getAllAccounts =async (req,res) =>{
  try{
    const {role}=req.sender
    let result 
    if (role==1)result= await admin.getAllAccounts()
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const deleteAccount =async (req,res) =>{
  try{
    const {role}=req.sender
    id=req.body.id
    let result 
    if (role==1)result= await admin.deleteAccount(id)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const deleteAllAccounts =async (req,res) =>{
  try{
    const {role}=req.sender
    let result 
    if (role==1)result= await admin.deleteAllAccount()
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const createListAccounts =async (req,res) =>{
  try{
    let result 
    result= await admin.createListAccounts(req.listAccounts,3)
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

// const createAccount =async (req,res) =>{
//   try{
//     const {role}=req.sender
//     let result 
//     if (role==1)result= await admin.getAllAccounts()
//     else throw new Error("this role wasn't allowed access")
//     res.send(result)
//   }catch(error){
//     res.status(400).send({message: error.message})
//   }
// }

const deleteForm =async (req,res) =>{
  try{
    const {role}=req.sender
    let result 
    if (role==1)result= await form.deleteForm()
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const createForm=async (req,res) =>{
  try{
    const {role}=req.sender
    data=req.body.data
    let result 
    if (role==1)result= await form.createForm(data)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const checkUpdateForm=async (req,res) =>{
  try{
    const {role}=req.sender
    let result 
    if (role==1)result= await form.checkUpdateForm()
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

module.exports = {
  getResultById,
  getAllAccounts,
  deleteAllAccounts,  
  createListAccounts,
  deleteAccount,
  // createAccount,
  deleteForm,
  createForm,
  checkUpdateForm
}