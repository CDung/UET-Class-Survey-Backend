const knex = require('knex')(require('../db/dbconfig')) 

const getForm= async ()=> {
  try { 
    const result = await knex('surveyform').orderBy('id')
    if (result.length == 0) throw new Error("Not found or form is null")
    return result
  } catch (err) {
    throw err
  }
}

const deleteForm= async ()=> {
  try { 
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")
    await knex('reportofstudent').del()
    await knex('surveyform').del()
    return "OK"
  } catch (err) {
    throw err
  }
}

const createForm= async (data)=> {
  try { 
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")
  	var maxIndex= await knex('surveyform').max('id')
    index=maxIndex[0]["max(`id`)"]
    if(index==null) index=0
    input =data.map(function (r) {
      ++index
      return {
        id:index,
        criteria: r
      }
    })
	await knex('surveyform').insert(input)
	return ("OK")
  } catch (err) { 
    throw err
  }
}

const checkUpdateForm= async()=>{
	try { 
	  result=await knex('coursesoflecturers').select()
	  if (result.length == 0) return true 
	  else return false
  } catch (err) {
    throw err
  }
}

const deleteCriteria = async function(id){
  try {
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")
    await knex('reportofstudent').where({"criteria_id": id}).del()
    await knex('surveyform').where({"id": id}).del()
    return ("OK")
  } catch (err) {
    throw err
  }
} 

const createCriteria = async function(criteria){
  try {
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")  
    var maxIndex= await knex('surveyform').max('id')
    index=maxIndex[0]["max(`id`)"]
    if(index==null) index=0
    else index++
    await knex('surveyform').insert({"criteria":criteria,"id":index})
    return ("OK")
  } catch (err) {
    throw err
  }
} 

const editCriteria = async function(id,criteria){
  try {
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")    
    await knex('surveyform').where("id", id).update("criteria",criteria)
    return ("OK")
  } catch (err) {
    throw err
  }
} 



module.exports = {
  getForm,  
  deleteForm,
  createForm,
  checkUpdateForm,
  editCriteria,
  createCriteria,
  deleteCriteria 
}