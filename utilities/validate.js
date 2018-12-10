const moment = require('moment')

const isEmail = email => {
  const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

const isPassword = password => {
  return password.length >= 6
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

module.exports = {
  isEmail,
  isPassword,
  isDateString,
  isTimeString,
  isTimeBeforeNow
}