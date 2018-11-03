const knex = require('knex')(require('../dbconfig'));
const user= require('../model/user');
const sercure = require('../control/sercure');
// const host="localhost:3000"
 const host="https://classsurvey.herokuapp.com"
module.exports = { 
      getProfile : async function (req, res) {
      try {
        var id=sercure.getRequesterId(req)
        let result = {
          success: false,
          avatar: await user.getAvatar(id),
          role:await user.getRole(id),
          fullname: await user.getFullName(id),
        }
        if (result.avatar != null && result.role != null&&result.fullname != null){ 
          result.avatar = host + result.avatar;
          result.success=true;
          res.send(result);
        }else
        res.send({ success: false, error: "not found profile" })
      } catch (err) {
        res.send({ success: false, error: err.message })
      }
    }
}