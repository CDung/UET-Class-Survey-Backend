const moment = require('moment')
const _ = require("lodash") 

const isVnuEmail = email => {
  if (email==null) return false
  email=_.trim(""+email)
  const emailRegex=/^[a-zA-Z0-9_]+@vnu\.edu\.vn$/
  return emailRegex.test(email)  
}

const isUsername = username => {
  if (username==null) return false
  username=_.trim(""+username)  
  const usernameRegex = /^[a-zA-Z0-9_]+$/  
  return (username.length >= 3 && usernameRegex.test(username))
}

const isClassname = classname => {
  if (classname==null) return false
  classname=_.trim(""+classname)
  const classnameRegex = /^QH[a-zA-Z0-9_\-\/]+$/
  return (classname.length >= 3 && classnameRegex.test(classname))
}

const isPassword = password => {
  if (password==null) return false
  password=""+password  
  return password.length >= 6
}

const isFullname = fullname => {
  if (fullname==null) return false
  fullname=_.trim(""+fullname)  
  return fullname.length >= 3
}

const isDateString = date => {
  return moment(date, 'MM/DD/YYYY', true).isValid()
}

const isTimeString = time => {
  return moment(time, 'HH:mm:ss', true).isValid()
}

const isTimeBeforeNow = time => {
  return moment(time, 'MM/DD/YYYY HH:mm:ss', false).isBefore(moment().format())
}

const  standard = input=> {
  return _.trim(""+input)
}

module.exports = {
  isVnuEmail,
  isPassword,
  isUsername,
  isClassname,
  isFullname,
  isDateString,
  isTimeString,
  isTimeBeforeNow,
  standard
}