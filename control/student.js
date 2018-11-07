const knex = require('knex')(require('../dbconfig'));
const user= require('../model/user');
const admin =require('../model/admin');
const student= require('../model/student');
const lecturer= require('../model/lecturer');
const sercure = require('../control/sercure');

module.exports = { 
    getProfile : async function (req, res) {
        try {
            var id=sercure.getToken(req).id
            var role=sercure.getToken(req).role
            let result =  await user.getProfile(id,role);
            if (result.success==true && result.avatar != null && result.role != null&&result.fullname != null &&result.vnuemail!=null ){
                if (result.role ==3 && result.classname ==null) res.send({ success: false, error: "not found profile" })
                res.send(result)
            }
            res.send({ success: false, error: "not found profile" })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },

    getCourses : async function (req, res) {
        try{
            var id=sercure.getToken(req).id
            var role=sercure.getToken(req).role
            let result 
            if (role==1)  result=await admin.getCourses(id);
            if (role==2)  result=await lecturer.getCourses(id);
            if (role==3)  result=await student.getCourses(id);
            if (result.success==true ){                
                res.send(result)
            }
            res.send({ success: false, error: "not found courses" })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    }    
}