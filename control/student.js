const knex = require('knex')(require('../dbconfig')) 
const student= require('../model/student')
const sercure = require('../control/sercure')

module.exports = {

    postReport : async function (req, res) {
        try{
            var id=sercure.getToken(req).id
            var role=sercure.getToken(req).role
            var course_id=req.body.course_id
            var points=req.body.points
            let result 
            if (role==3 )  result=await student.postReport(course_id,id,points)
            if (result.success==true ){                
                res.send(result)
            }
            res.send({ success: false, error: "can't postReport" })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,
}