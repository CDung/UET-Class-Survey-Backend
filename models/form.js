const knex = require('knex')(require('../db/dbconfig')) 

const getForm= async ()=> {
  try { 
    const result = await knex('surveyform').orderBy('id')
    if (result.length == 0) throw new Error("not found or form is null")
    return result
  } catch (err) {
    throw err
  }
}

const deleteForm= async ()=> {
  try { 
    await knex('reportofstudent').del()
    await knex('surveyform').del()
    return "OK"
  } catch (err) {
    throw err
  }
}

const createForm= async (data)=> {
  try { 
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
	result=await knex('courses').select()
	if (result.length == 0) return true 
	else return false
  } catch (err) {
    throw err
  }
}

module.exports = {
  getForm,  
  deleteForm,
  createForm,
  checkUpdateForm
}