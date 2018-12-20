const knex = require('knex')(require('../db/dbconfig')) 
const user= require('./user')
const code=require('../utilities/code')
const validate=require('../utilities/validate')
const {standard}=require('../utilities/validate')

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
    listStudents = await knex.select('users.id','users.role','users.username','students.fullname','students.vnuemail','students.classname').from('users').rightJoin('students','users.id','students.id')
    listLecturers = await knex.select('users.id','users.role','users.username','lecturers.fullname','lecturers.vnuemail').from('users').rightJoin('lecturers','users.id','lecturers.id')
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
    usernameDB = await knex('users').select('username').map(function (obj) {return obj.username}) 
    listAccounts.some(obj=>{
      if(!validate.isUsername(obj.username))
        throw new Error ("have some invalid username or xlsx is imformal")
      else{
        obj.username=standard(obj.username)
        if(usernameDB.indexOf(obj.username) >= 0) throw new Error ("have some existed username") 
      }

      if(!validate.isPassword(obj.password))
        throw new Error ("have some invalid password or xlsx is imformal")
      else
        obj.password=code.encrypt(""+obj.password)

      if(!validate.isFullname(obj.fullname))
        throw new Error ("have some invalid fullname or xlsx is imformal") 
      else
        obj.fullname=standard(obj.fullname)

      if(!validate.isVnuEmail(obj.vnuemail))
        throw new Error ("have some invalid vnuemail or xlsx is imformal") 
      else
        obj.vnuemail=standard(obj.vnuemail)

      if(role==3 ){
        if(!validate.isClassname(obj.classname))
          throw new Error ("have some invalid classname or xlsx is imformal") 
        else
          obj.classname=standard(obj.classname)
      }      

    })  

    var maxIndex= await knex('users').max('id')
    userIndex=maxIndex[0]["max(`id`)"]
    infoIndex=maxIndex[0]["max(`id`)"]

    listUser =listAccounts.map(function (obj) {
      ++userIndex
      return {
        id:userIndex,
        username: obj.username,
        password: obj.password,
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

const createAccount= async (account)=> {
  try { 
    if (account.role!=2 && account.role!=3) throw new Error("Account role is invalid")

    usernameDB = await knex('users').select('username').map(function (obj) {return obj.username}) 
    if(!validate.isUsername(account.username))
      throw new Error ("invalid username ")
    else{
      account.username=standard(account.username)
      if(usernameDB.indexOf(account.username) >= 0) throw new Error ("existed username") 
    }

    if(!validate.isPassword(account.password))
      throw new Error ("invalid password ")
    else
      account.password=code.encrypt(""+account.password)

    if(!validate.isFullname(account.fullname))
      throw new Error ("invalid fullname ") 
    else
      account.fullname=standard(account.fullname)

    if(!validate.isVnuEmail(account.vnuemail))
      throw new Error ("invalid vnuemail ") 
    else
      account.vnuemail=standard(account.vnuemail)

    if(account.role==3 ){
      if(!validate.isClassname(account.classname))
        throw new Error ("invalid classname ") 
      else
        account.classname=standard(account.classname)
    } 

    var maxIndex= await knex('users').max('id')
    id=maxIndex[0]["max(`id`)"]+1  
    await knex('users').insert({id:id,role:account.role,username:account.username,password:account.password})
    if (account.role==2)
      await knex('lecturers').insert({id:id,fullname:account.fullname,vnuemail:account.vnuemail})
    else
      await knex('students').insert({id:id,fullname:account.fullname,vnuemail:account.vnuemail,classname:account.classname})
    return "OK"
  } catch (err) {
    throw err
  }
}

const deleteCourse= async (course_id)=> {
  try { 
    const result = await knex('courses').select().where({course_id:course_id})
    if (result.length == 0) throw new Error("not found course")      
    await knex('reportofstudent').where({course_id:course_id}).del()
    await knex('lecturersofcourse').where({course_id:course_id}).del()
    await knex('studentsofcourse').where({course_id:course_id}).del()
    await knex('courses').where({course_id:course_id}).del()
    return "OK"
  } catch (err) {
    throw err
  }
}

const deleteAllCourses= async ()=> {
  try { 
    await knex('reportofstudent').del()
    await knex('lecturersofcourse').del()
    await knex('studentsofcourse').del()
    await knex('courses').del()
    return "OK"
  } catch (err) {
    throw err
  }
}

const createCourse= async (listAccounts,data)=> {
  try { 

    var result = await knex('courses').select().where({course_id:data.course_id})
    if (result.length != 0) throw new Error("new course_id existed")  

    result = await knex('lecturers').select().where({id:data.lecturer_id})
    if (result.length == 0) throw new Error("lecturer_id didn't exist") 

    result =await knex('users').select('id','username')
    if (result.length == 0) throw new Error("not found list account") 
    idByUsername = result.reduce(function(map, obj) {
      map[obj.username] = obj.id
      return map
      }, {}
    )  

    listAccounts.some(obj=>{
      if(!validate.isUsername(obj.username))
        throw new Error ("have some invalid username or xlsx is imformal")
      else{
        if(idByUsername[standard(obj.username)]==null) throw new Error ("student username didn't exist") 
        obj.id= idByUsername[standard(obj.username)]
      }
    })
    
    listStudents =listAccounts.map(function (obj) {
      return {
        id:obj.id,
        course_id:data.course_id
      }
    })
     
    await knex('courses').insert({
      course_id: standard(data.course_id),
      subject:standard(data.subject),
      year:standard(data.year),
      semester:standard(data.semester),
      time:standard(data.year),
      place:standard(data.place),
      credit:standard(data.credit),
    })

    await knex('lecturersofcourse').insert({
      course_id: standard(data.course_id),
      id: standard(data.lecturer_id),
    }) 

    await knex('studentsofcourse').insert(listStudents)
    return "OK"
  }catch (err) {
    throw err
  }
}


module.exports = {
  getProfile,
  getCourses,
  getResultById,
  getAllAccounts,
  deleteAllAccount,
  createListAccounts,
  deleteAccount,
  createAccount,
  createCourse,
  deleteCourse,
  deleteAllCourses
}