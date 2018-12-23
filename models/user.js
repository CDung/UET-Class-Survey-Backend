const knex = require('knex')(require('../db/dbconfig')) 
const code=require('../utilities/code')
const validate=require('../utilities/validate')
const {standard}=require('../utilities/validate')

const host="localhost:3000"
const avatarPath="/resource/avatar/"
// const host="classsurvey.herokuapp.com"

const getAvatar= async (id)=> {
  try {
    const result = await knex(`users`).where('id', id)
    if (result.length == 0) throw new Error("Not found")
    return host+result[0].avatar
  } catch (err) {
    throw err
  }
}

const updatePassword= async (id,password)=> {
  try {
    const result = await knex('users').where({'id':id})
    if (result.length == 0) throw new Error("Not found account")

    if(!validate.isPassword(password))
      throw new Error ("Invalid password")
    else
      password=code.encrypt(""+password)

    await knex('users').where({id:id}).update({password:password})
    return "OK"
  } catch (err) {
    throw err
  }
}

const updateInfo= async (id,account)=> {
  try {
  	if (account.role!=1 && account.role!=2 && account.role!=3 ) throw new Error("Account role is invalid")

    const result = await knex('users').where({'id':id,'role':account.role})
    if (result.length == 0) throw new Error("Not found account")

    if(!validate.isFullname(account.fullname))
      throw new Error ("Invalid fullname ") 
    else
      account.fullname=standard(account.fullname)

    if(!validate.isVnuEmail(account.vnuemail))
      throw new Error ("Invalid vnuemail ") 
    else
      account.vnuemail=standard(account.vnuemail)

    if(account.role==3 ){
      if(!validate.isClassname(account.classname))
        throw new Error ("Invalid classname ") 		
      else
        account.classname=standard(account.classname)		
    } 	
    if(account.role==1)await knex('admins').where({id:id}).update({fullname:account.fullname,vnuemail:account.vnuemail})
    if(account.role==2)await knex('lecturers').where({id:id}).update({fullname:account.fullname,vnuemail:account.vnuemail})
	if(account.role==3)await knex('students').where({id:id}).update({fullname:account.fullname,vnuemail:account.vnuemail,classname:account.classname})

    return "OK"
  } catch (err) {
    throw err
  }
}

const updateAvatar= async (id)=> {
  try {
  	const path=avatarPath+id+".jpg"
  	console.log(path)
    const result = await knex('users').where({'id':id})
    if (result.length == 0) throw new Error("Not found account")
    await knex('users').where({id:id}).update({avatar:path})
    return "OK"
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAvatar,  
  updatePassword,
  updateInfo,
  updateAvatar
}