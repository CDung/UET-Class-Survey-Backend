var express = require('express')
var router = express.Router()

const { authenticate } = require('../middlewares/authenticate')
const user = require('../controllers/user')
const admin = require('../controllers/admin')
const lecturer = require('../controllers/lecturer')
const student = require('../controllers/student')
const storage = require('../middlewares/storage')

router.post('/login',user.login)
router.get('/profile', authenticate ,user.getProfile)
router.get('/courses', authenticate ,user.getCourses)
router.get('/form', authenticate ,user.getForm)

router.post('/result', authenticate ,lecturer.getResult)

router.put('/report', authenticate ,student.postReport)

router.post('/resultById', authenticate ,admin.getResultById)

router.get('/allAccounts', authenticate ,admin.getAllAccounts)
router.delete('/allAccounts', authenticate ,admin.deleteAllAccounts)
// router.put('/account', authenticate ,admin.createAccount)
router.delete('/account', authenticate ,admin.deleteAccount)
router.delete('/form', authenticate ,admin.deleteForm)
router.put('/form', authenticate ,admin.createForm)
router.get('/checkUpdateForm', authenticate ,admin.checkUpdateForm)
router.post('/upList', storage.upList,admin.createListAccounts)
router.post('/upAvatar', storage.upAvatar)
// router.post('/upAvatar',authenticate, storage.upAvatar)
// router.post('/upListStudentsOfCourse',authenticate, storage.upListStudentsOfCourse,admin.createCourse)

module.exports = router;