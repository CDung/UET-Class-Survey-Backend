const knex = require('knex')(require('../dbconfig')) 
const host="localhost:3000"
 // const host="https://classsurvey.herokuapp.com"

module.exports = {
  getAvatar: async function (id) {
    try {
      const result = await knex(`users`).where('id', id)
      if (result.length == 0) return Promise.reject(new Error("id is not exit"))
      return Promise.resolve(result[0].avatar)
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  },

   getProfile: async function (id) {
    try {
      const roleOfUser = await this.getRole(id) 
      var avatarLink= await this.getAvatar(id)
      if (avatarLink !=null) avatarLink=host+avatarLink
      if (roleOfUser==1) role='admins'
      else if (roleOfUser==3) role='students'
      else if (roleOfUser==2) role='lecturers'
      else return Promise.reject(new Error("err role")) 
      const result = await knex(role).where('id', id)
      if (result.length == 0) return Promise.reject(new Error("id is not exit"))
      return Promise.resolve({success: true, avatar: avatarLink, role:roleOfUser,fullname:result[0].fullname,vnuemail : result[0].vnuemail,classname: result[0].classname})
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  },
   getRole: async function (id) {
    try {
      const result = await knex('users').where('id', id)
      if (result.length == 0) return Promise.reject(new Error("id is not exit"))
      return Promise.resolve(result[0].role)
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  },
}