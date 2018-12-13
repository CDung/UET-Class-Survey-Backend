const knex = require('knex')(require('../db/dbconfig')) 
const user= require('./user')
const code=require('../utilities/code')

const getProfile= async (id)=> {
  try {
    const result = await knex('admins').where('id', id)
    if (result.length == 0) throw new Error("not found profile")
    return Promise.resolve({avatar: await user.getAvatar(id), role:1,fullname:result[0].fullname,vnuemail : result[0].vnuemail})
  } catch (err) {
    throw err
  }
}

const getCourses= async ()=> {
  try { 
    const result = await knex('coursesoflecturers').select('course_id','id','fullname','subject')
    if (result.length == 0) throw new Error("not found or not have course")
    return result
  } catch (err) {
    throw err
  }
}

const getResultById= async (id,course_id)=> {
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

const getAllAccounts =async ()=> {
  try { 
    listStudents = await knex.select('users.id','users.username','students.fullname','students.vnuemail','students.classname').from('users').rightJoin('students','users.id','students.id')
    listLecturers = await knex.select('users.id','users.username','lecturers.fullname','lecturers.vnuemail').from('users').rightJoin('lecturers','users.id','lecturers.id')
    const result=listLecturers.concat(listStudents)
    if (result.length == 0) throw new Error("not found or not have account")
    return result
  } catch (err) {
    throw err
  }
}

const deleteAllAccount= async ()=> {
  try {    
    await knex('lecturersofcourse').del()
    await knex('lecturers').del()
    await knex('reportofstudent').del()
    await knex('studentsofcourse').del()
    await knex('students').del()
    await knex('users').del().whereNot({role:1})
    return "OK"
  } catch (err) {
    throw err
  }
}

const createListAccounts=async(listAccounts,role)=>{
  try { 
    usernameUP = listAccounts.map(function (obj) {return obj.username})
    if( usernameUP.some(r=> r== null) ) throw new Error ("have some invalid username or xlsx is imformal")

    usernameDB = await knex('users').select('username').map(function (obj) {return obj.username})  
    if( usernameUP.some(r=> usernameDB.indexOf(r) >= 0) ) throw new Error ("have some exited username")  

    passwordUP = listAccounts.map(function (obj) {return obj.password})
    if( passwordUP.some(r=> r== null) ) throw new Error ("have some invalid password or xlsx is imformal")

    fullnameUP = listAccounts.map(function (obj) {return obj.fullname})
    if( fullnameUP.some(r=> r== null) ) throw new Error ("have some invalid fullname or xlsx is imformal") 

    vnuemailUP = listAccounts.map(function (obj) {return obj.vnuemail})
    if( vnuemailUP.some(r=> r== null) ) throw new Error ("have some invalid vnuemail or xlsx is imformal")  

    classnameUP = listAccounts.map(function (obj) {return obj.classname})
    if( role==3 && classnameUP.some(r=> r== null) ) throw new Error ("have some invalid classname or xlsx is imformal")   

    var maxIndex= await knex('users').max('id')
    userIndex=maxIndex[0]["max(`id`)"]
    infoIndex=maxIndex[0]["max(`id`)"]

    listUser =listAccounts.map(function (obj) {
      ++userIndex
      return {
        id:userIndex,
        username: obj.username,
        password: code.encrypt(""+obj.password),
        role:role
      }
    })
    await knex('users').insert(listUser)

    if (role==3){
      listInfo =listAccounts.map(function (obj) {
        ++infoIndex
        return {
          id:infoIndex,
          fullname :obj.fullname,
          classname: obj.classname,
          vnuemail: obj.vnuemail,
        }
      })
      await knex('students').insert(listInfo)
    } else
    if (role==2){
      listInfo =listAccounts.map(function (obj) {
        ++infoIndex
        return {
          id:infoIndex,
          fullname :obj.fullname,
          vnuemail: obj.vnuemail,
        }
      })
      await knex('lecturers').insert(listInfo)
    } else
        throw new Error ("role of list accounts is invalid ")

    return "OK"
  } catch (err) {
    throw err
  }
}

const deleteAccount= async (id)=> {
  try { 
    const result = await knex('users').select('role').where({'id':id})
    if (result.length == 0) throw new Error("not found account")
    if(result[0].role==2){      
      await knex('lecturersofcourse').del().where({'id':id})
      await knex('lecturers').del().where({'id':id})
      await knex('users').del().where({'id':id})
    }else
    if(result[0].role==3){   
      await knex('reportofstudent').del().where({'id':id})
      await knex('studentsofcourse').del().where({'id':id})
      await knex('students').del().where({'id':id})
      await knex('users').del().where({'id':id})
    }else
      throw new Error ("role of list accounts is invalid ")
    return "OK"
  } catch (err) {
    throw err
  }
}

// const createAccount= async ()=> {
//   try { 
//     const result = await knex('coursesoflecturers').select('course_id','id','fullname','subject')
//     if (result.length == 0) throw new Error("not found or not have course")
//     return result
//   } catch (err) {
//     throw err
//   }
// }

module.exports = {
  getProfile,
  getCourses,
  getResultById,
  getAllAccounts,
  deleteAllAccount,
  createListAccounts,
  deleteAccount,
  // createAccount,
}