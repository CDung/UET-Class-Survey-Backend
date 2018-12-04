const knex = require('knex')(require('../dbconfig'))
const admin= require('../model/admin')
const student= require('../model/student')
const lecturer= require('../model/lecturer')
const form= require('../model/form')
const sercure = require('../control/sercure')

module.exports = {

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

    getAllStudents : async function (req, res) {
        try{
            var role =sercure.getToken(req).role
            let result
            if (role==1)  result=await student.getAllStudents()
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
            if (role==1)  result=await lecturer.getAllLecturers()
            if (result.success==true ){                
                res.send(result)
            }else
                res.send({ success: false, error: "can't get all lecturers" })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    
    },

    deleteCriteria : async function (req,res){
        try{
            var role=sercure.getToken(req).role
            var id=req.body.id
            let result
            if (role==1) await form.deleteCriteria(id);             
            res.send({ success: true})
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,

    createCriteria : async function (req,res){
        try{
            var role=sercure.getToken(req).role
            var criteria=req.body.criteria
            let result
            if (role==1) await form.createCriteria(criteria);             
            res.send({ success: true})
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,

    editCriteria : async function (req,res){
        try{
            var role=sercure.getToken(req).role
            var id=req.body.id
            var criteria=req.body.criteria
            let result
            if (role==1) await form.editCriteria(id,criteria);             
            res.send({ success: true})
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,
}