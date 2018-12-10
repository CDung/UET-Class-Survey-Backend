const formidable = require('formidable')
const fs = require('fs')

const upAvatar = async  (req,res)=> {
    try{         
        var form =  new formidable.IncomingForm();
        form.uploadDir = "./public/resource/avatar/";
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
} 

module.exports = {
  upAvatar
}