const knex = require('knex')(require('../dbconfig')) 

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

   getFullName: async function (id) {
    try {
      const roleOfUser = await this.getRole(id) 
      if (roleOfUser==1) role='admins'
      else if (roleOfUser==3) role='students'
      else if (roleOfUser==2) role='lecturers'
      else return Promise.reject(new Error("err role")) 
      const result = await knex(role).where('id', id)
      if (result.length == 0) return Promise.reject(new Error("id is not exit"))
      return Promise.resolve(result[0].fullname)
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