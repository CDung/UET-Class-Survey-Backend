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
router.post('/resulft', authenticate ,lecturer.getResulft)
router.put('/report', authenticate ,student.postReport)
router.post('/resulftById', authenticate ,admin.getResulftById)
router.get('/allStudents', authenticate ,admin.getAllStudents)
router.get('/allLecturers', authenticate ,admin.getAllLecturers)
// router.post('/upAvatar',authenticate, storage.upAvatar)
// router.post('/upListStudents',authenticate, storage.upListStudents,admin.createListStudents)
// router.post('/upListLecturers',authenticate, storage.upListLecturers,admin.createListLecturer)
// router.post('/upListStudentsOfCourse',authenticate, storage.upListStudentsOfCourse,admin.createCourse)

// router.delete('/criteria', authenticate ,admin.deleteCriteria)
// router.put('/criteria', authenticate ,admin.createCriteria)
// router.post('/criteria', authenticate ,admin.editCriteria)
// router.delete('/student', authenticate ,admin.deleteStudent)
// router.put('/student', authenticate ,admin.createStudent)

module.exports = router;