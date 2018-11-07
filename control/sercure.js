const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
const secretCode = "bebongcute" 
const tokenExpiration = 10082911 
const _ = require("lodash") 
const knex = require('knex')(require('../dbconfig')) 

module.exports = {

	authenticate: function (req, res) {
    	const username = req.body.username 
    	const password = req.body.password 
    	const result = this.validUserPass(username, password) 

    	if (result.success == false) res.send(result) 
    	knex('users').where('username',username).then((result) => {
    		if (result.length == 0) return res.send({ success: false, token: "", error: { message: "username is not exit" } }) 
    		if (this.compare(password, result[0].password)) 
    			return res.send({ success: true, token: this.createUserToken(result[0], expiresIn = tokenExpiration), error: null }) 
    		return res.send({ success: false, token: "", error: { message: "Nhập sai password" }}) 
    	})
  },

    validUserPass: function (username, password) {
    	if (_.trim(username) == "")
    		return { success: false, token: "", error: { message: "username is empty" } } 
    	if (_.trim(password) == "")
        	return { success: false, token: "", error: { message: "password is empty" } } 
    	if (username.length > 30)
        	return { success: false, token: "", error: { message: "username too long" } } 
    	if (password.length > 30)
        	return { success: false, token: "", error: { message: "password too long" } } 

    	return { success: true, payload: {}, error: null } 
  	},


    encrypt: function (str) {
    	const salt = bcrypt.genSaltSync(10) 
    	return bcrypt.hashSync(str, salt) 
    },

    compare: function (raw, hash) {
    	return bcrypt.compareSync(raw, hash) 
    },

    createUserToken: function (user, expire) {
    	return jwt.sign({
        	id: user.id,
        	role: user.role,
        	expiresIn: tokenExpiration
    	}, secretCode, {
        	expiresIn: tokenExpiration
      	}) 
  	},

    verifyToken: function (req, res, next) {
    	const token = req.headers['authorization'] 
    	if (typeof token !== 'undefined') { 
      		jwt.verify(token, secretCode, (err, authData) => {
        	if (err)
            	res.sendStatus(403) 
        	else next() 
        	})
    	} else res.sendStatus(403) 
    },

    getToken: function(req) {
    	if (req.headers['authorization'] == null) throw new Error('Request not correct')    
    	return jwt.decode(req.headers['authorization'])
  	}
}