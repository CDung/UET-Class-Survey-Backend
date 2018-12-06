const knex = require('knex')(require('../dbconfig')) 
const host="localhost:3000"
var formidable = require('formidable')
var fs = require('fs')
// const host="https://classsurvey.herokuapp.com"

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

    checkAccount:async function(username){
    	try {
            const result = await knex(`users`).where('username', username)
            if (result.length == 0) return Promise.resolve(0)
            return Promise.resolve(1)
        } catch (err) {
            return Promise.reject(new Error(err))
        }
    },

    getId: async function (username) {
        try {
            const result = await knex(`users`).where('username', username)
            if (result.length == 0) return Promise.reject(new Error("id is not exit"))
            return Promise.resolve(result[0].id)
        } catch (err) {
            return Promise.reject(new Error(err))
        }
    },

    upAvatar : async function (req,res) {
        try{         
            var form =  new formidable.IncomingForm();
            form.uploadDir = "./resource/avatar/";
            form.parse(req,function (err, fields, file) {
                var path = file.files.path;
                var newpath = form.uploadDir + 'id'+'.jpg';
                fs.rename(path, newpath, function (err) {
                    if (err) throw err;
                    res.send({success:true});
                });
            })
        }
        catch(err) {
            res.send({ success: false, error: err.message })
        }
    } ,

}