var express = require('express')
var router = express.Router()

const { authenticate } = require('../middlewares/authenticate')
const user = require('../controllers/user')
const admin = require('../controllers/admin')
const lecturer = require('../controllers/lecturer')
const student = require('../controllers/student')
const storage = require('../middlewares/storage')

router.post('/login',user.login)
router.post('/report', authenticate ,student.postReport)
router.post('/result', authenticate ,lecturer.getResult)
router.post('/resultById', authenticate ,admin.getResultById)
router.post('/form', authenticate ,admin.createForm)
router.post('/account', authenticate ,admin.createAccount)
router.post('/upList', authenticate,storage.upList,admin.createListAccounts)
router.post('/course', authenticate,storage.upList,admin.createCourse)
router.post('/criteria', authenticate ,admin.createCriteria)

router.get('/profile', authenticate ,user.getProfile)
router.get('/courses', authenticate ,user.getCourses)
router.get('/form', authenticate ,user.getForm)
router.get('/allAccounts', authenticate ,admin.getAllAccounts)
router.get('/checkUpdateForm', authenticate ,admin.checkUpdateForm)

router.put('/password',authenticate ,user.updatePassword)
router.put('/info',authenticate ,user.updateInfo)
router.put('/upAvatar', authenticate,storage.upAvatar,user.updateAvatar)
router.put('/passwordForAdmin', authenticate ,admin.updateAccountPassword)
router.put('/infoForAdmin', authenticate ,admin.updateAccountInfo)
router.put('/criteria', authenticate ,admin.editCriteria)

router.delete('/form', authenticate ,admin.deleteForm)
router.delete('/account', authenticate ,admin.deleteAccount)
router.delete('/allAccounts', authenticate ,admin.deleteAllAccounts)
router.delete('/course', authenticate,admin.deleteCourse)
router.delete('/courses', authenticate,admin.deleteAllCourses)
router.delete('/criteria', authenticate ,admin.deleteCriteria)
router.delete('/someAccounts', authenticate ,admin.deleteSomeAccounts)
router.delete('/someCourses', authenticate ,admin.deleteSomeCourses)



module.exports = router;