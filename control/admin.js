const knex = require('knex')(require('../dbconfig'))
const admin= require('../model/admin')
const sercure = require('../control/sercure')

module.exports = {
    getAllStudents : async function (req, res) {
        try{
            var role =sercure.getToken(req).role
            let result
            if (role==1)  result=await admin.getAllStudents()
            if (result.success==true ){                
                res.send(result)
            }else
                res.send({ success: false, error: "can't get all students" })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }    
    },

    getAllLecturers : async function (req, res) {
        try{
            var role =sercure.getToken(req).role
            let result
            if (role==1)  result=await admin.getAllLecturers()
            if (result.success==true ){                
                res.send(result)
            }else
                res.send({ success: false, error: "can't get all lecturers" })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    
    },

	getResulftById  : async function (req, res) {
        try{            
            var role=sercure.getToken(req).role
            var course_id=req.body.course_id
            var id=req.body.id
            let result 
            if (role==1)  result=await admin.getResulftById(id,course_id)
            if (result.success==true ){                
                res.send(result)
            }else
                res.send({ success: false, error: "not found result" })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,

    deleteCriteria : async function (req,res){
        try{
            var role=sercure.getToken(req).role
            var id=req.body.id
            let result
            if (role==1) await admin.deleteCriteria(id);             
            res.send({ success: true})
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,
}