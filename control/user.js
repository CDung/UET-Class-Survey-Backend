const knex = require('knex')(require('../dbconfig'));
const user= require('../model/user');
const sercure = require('../control/sercure');

module.exports = { 
      getProfile : async function (req, res) {
      try {
        var id=sercure.getRequesterId(req)
        let result =  await user.getProfile(id);
        if (result.success==true && result.avatar != null && result.role != null&&result.fullname != null &&result.vnuemail!=null ){
          if (result.role ==3 && result.classname ==null) res.send({ success: false, error: "not found profile" })
           res.send(result)
        }
        res.send({ success: false, error: "not found profile" })
      } catch (err) {
        res.send({ success: false, error: err.message })
      }
    }
}