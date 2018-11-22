const knex = require('knex')(require('../dbconfig'))
const lecturer= require('../model/lecturer')
const sercure = require('../control/sercure')

module.exports = {
	 getResulft : async function (req, res) {
        try{
            var id=sercure.getToken(req).id
            var role=sercure.getToken(req).role
            var course_id=req.body.course_id
            let result 
            if (role==2)  result=await lecturer.getResulft(id,course_id)
            if (result.success==true ){                
                res.send(result)
            }
            res.send({ success: false, error: "not found result" })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,
}