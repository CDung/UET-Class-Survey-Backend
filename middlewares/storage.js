const formidable = require('formidable')
const { parse } = require('querystring');
const fs = require('fs')
const XLSX = require('xlsx')

const upAvatar = async  (req,res,next)=> {
  try{         
    const id=req.sender.id
    if (id==null) throw new Error("id err")
    var form =  new formidable.IncomingForm()
    form.uploadDir = "./public/resource/avatar/"
    form.parse(req,function (err, fields, file) {
      var path = file.files.path
      var newpath = form.uploadDir + id+'.jpg'
      fs.rename(path, newpath, function (err) {
        if (err) throw err
          next()
        })
      })
  }
  catch(error) {
    res.status(400).send({message: error.message})
  }
} 

const upList = async  (req,res,next)=> {
  try{       
    var form =  new formidable.IncomingForm()        
    form.uploadDir = "./public/resource/xlsx/"
    form.parse(req,function (err, fields, file) {   
      try{
        var data={
          accountsRole:fields.role,
          course_id: fields.course_id,
          lecturer_id: fields.lecturer_id,
          subject:fields.subject,
          year:fields.year,
          semester:fields.semester,
          time:fields.year,
          place:fields.place,
          credit:fields.credit,
        }   
        var path = file.file.path
        var newpath = form.uploadDir + 'l.xlsx'
        fs.rename(path, newpath, function (err) {
          try{
            var workbook = XLSX.readFile('./public/resource/xlsx/l.xlsx')
            var sheet_name_list = workbook.SheetNames
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
            fileData=Array.from(xlData)
            if (fileData.length==0){
              res.status(400).send({message: "File is empty or not correct"}) 
              return
            }                   
            req.listAccounts=fileData
            req.data=data
            next()
          }  
          catch(error){
            res.status(400).send({message: "ERROR when read file excel :"+ error.message})
          }  
        })
      }
      catch(error){
        res.status(400).send({message: "ERROR when upload :"+ error.message})
      }    
    })
  }
  catch(error) {
    res.status(400).send({message: error.message})
  }
} 


module.exports = {
  upAvatar,
  upList,
}