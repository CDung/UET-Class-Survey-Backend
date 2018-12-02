var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

http.createServer(function (req, res) {
    //Nếu request là uplooad và method là post
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        //Khởi tạo form
        var form =  new formidable.IncomingForm();
        //Thiết lập thư mục chứa file trên server
        form.uploadDir = "uploads/";
        //xử lý upload
        form.parse(req,function (err, fields, file) {
            //path tmp trên server
            var path = file.files.path;
            //thiết lập path mới cho file
            var newpath = form.uploadDir + file.files.name;
            fs.rename(path, newpath, function (err) {
                if (err) throw err;
                res.end('Upload Thanh cong!');
            });
        });
        return ;
    }
    //xét header cho request
    res.writeHead('200',{'Content-Type': 'text/html'});
    //Đọc file index và trả về dữ liệu
    fs.readFile('index.html','utf8',function (err,data) {
        //nếu nỗi thì thông báo
        if (err) throw err;
        //không lỗi thì render data
        res.end(data);    
    })
}).listen(8000);