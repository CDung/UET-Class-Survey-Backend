const knex = require('knex')(require('../dbconfig')) 
// const host="localhost:3000"
const host="https://classsurvey.herokuapp.com"

module.exports = {
    getAvatar: async function (id) {
        try {
            const result = await knex(`users`).where('id', id)
            if (result.length == 0) return Promise.reject(new Error("id is not exit"))
            return Promise.resolve(host+result[0].avatar)
        } catch (err) {
            return Promise.reject(new Error(err))
        }
    },   

}