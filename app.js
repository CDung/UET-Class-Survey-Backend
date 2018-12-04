const express = require('express') 
const app = express() 
const sercure=require('./control/sercure') 
const userController=require('./control/user')
const adminController=require('./control/admin') 
const lecturerController=require('./control/lecturer') 
const studentController=require('./control/student') 
const jsonParser = require('body-parser').json() 
const cookieParser = require('cookie-parser')

app.use(jsonParser) 
app.use((req, res, next) => {   
    res.header('Access-Control-Allow-Origin', '*') 
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Authorization') 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    next() 
})  
app.use(express.static('./view/')) 
app.use(cookieParser())   
app.listen(process.env.PORT ||3000) 


app.post('/api/login', function(req, res){
	sercure.authenticate(req,res) 
}) 
app.get('/api/profile', sercure.verifyToken, (req, res) => {
      userController.getProfile(req, res) 
})
app.get('/api/courses', sercure.verifyToken, (req, res) => {
      userController.getCourses(req, res) 
})
app.get('/api/form', sercure.verifyToken, (req, res) => {
      userController.getForm(req, res) 
})
app.post('/api/upAvatar', function(req, res) {
      userController.upAvatar(req, res) 
})
app.post('/api/resulft', sercure.verifyToken, (req, res) => {
      lecturerController.getResulft(req, res) 
})
app.put('/api/report', sercure.verifyToken, (req, res) => {
      studentController.postReport(req, res) 
})
app.post('/api/resulftById', sercure.verifyToken, (req, res) => {
      adminController.getResulftById(req, res) 
})
app.get('/api/allStudents', sercure.verifyToken, (req, res) => {
      adminController.getAllStudents(req, res) 
})
app.get('/api/allLecturers', sercure.verifyToken, (req, res) => {
      adminController.getAllLecturers(req, res) 
})
app.delete('/api/criteria', sercure.verifyToken, (req, res) => {
      adminController.deleteCriteria(req, res) 
})
app.put('/api/criteria', sercure.verifyToken, (req, res) => {
      adminController.createCriteria(req, res) 
})
app.post('/api/criteria', sercure.verifyToken, (req, res) => {
      adminController.editCriteria(req, res) 
})
app.get('*',function(req,res){
	if (req.url.startsWith("/resource")&&req.url.endsWith(".jpg")) {
    	res.sendFile(__dirname+req.url)
    	return
  	}
  	res.sendStatus(404) 
})