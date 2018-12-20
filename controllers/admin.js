const knex = require('knex')(require('../db/dbconfig')) 
const admin= require('../models/admin')
const student= require('../models/student')
const lecturer= require('../models/lecturer')
const user= require('../models/user')
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
    const {role}=req.sender
    const {accountsRole}=req.data
    if (accountsRole !=2 && accountsRole !=3) throw new Error("Accounts role is invalid")
    let result 
    if (role==1) result= await admin.createListAccounts(req.listAccounts,accountsRole)
    else throw new Error("this role wasn't allowed access")  
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const createAccount =async (req,res) =>{
  try{
    const {role}=req.sender
    let account={
      role:req.body.role,
      username:req.body.username,
      password:req.body.password,
      fullname:req.body.fullname,
      vnuemail:req.body.vnuemail,
      classname:req.body.classname
    }
    let result 
    if (role==1) result= await admin.createAccount(account)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

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

const updateAccountPassword=async (req,res) =>{
  try{
    const {role}=req.sender
    const {id,password}=req.body
    let result 
    if (role==1)result= await user.updatePassword(id,password)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const updateAccountInfo=async(req,res)=>{
  try{
    const {role}=req.sender
    let account={
      role:req.body.role,
      username:req.body.username,
      fullname:req.body.fullname,   
      vnuemail:req.body.vnuemail,
      classname:req.body.classname
    }
    let result 
    if (role==1)  result = await user.updateInfo(req.body.id,account)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const deleteCourse =async (req,res) =>{
  try{
    const {role}=req.sender
    const course_id=req.body.course_id
    let result 
    if (role==1)result= await admin.deleteCourse(course_id)
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const deleteAllCourses =async (req,res) =>{
  try{
    const {role}=req.sender
    let result 
    if (role==1)result= await admin.deleteAllCourses()
    else throw new Error("this role wasn't allowed access")
    res.send(result)
  }catch(error){
    res.status(400).send({message: error.message})
  }
}

const createCourse =async (req,res) =>{
  try{
    const {role}=req.sender
    const listAccounts=req.listAccounts
    const data=req.data
    let result 
    if (role==1)result= await admin.createCourse(listAccounts,data)
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
  createAccount,
  updateAccountPassword,
  updateAccountInfo,
  deleteForm,
  createForm,
  checkUpdateForm,
  createCourse,
  deleteCourse,
  deleteAllCourses,
}