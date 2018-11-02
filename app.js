var mysql = require('mysql');
var express = require('express');
var url=require('url');
var fs=require("fs");
var app = express();


app.get('*', function(req, res){
	if(req.url===""||req.url==="/"||req.url==="/index.html"||req.url==="/index.html/"||req.url==="/index"){
		var dataIndex=fs.readFileSync(__dirname+"/index.html","utf-8");
		res.send(dataIndex);
		return;
	}		
    if (req.url.startsWith("/resource")&&req.url.endsWith(".jpg")) {
    	res.sendFile(__dirname+req.url);
    	return;
  	}
  	else{
		var conn = mysql.createConnection({   
  			host: "db4free.net",
  			user: "dungntc108",
  			password: "12345678",
  			database: "class_survey"
		});
		conn.connect();
		var q = url.parse(req.url, true).query;
		var a=q.action;
		var si=q.student_id;
  		var li=q.lecturer_id;
  		var ci=q.course_id;
		var sql ;
		var input;
		if (a==="get_resulft"){
			sql= "SELECT criteria,M,M1,M2 FROM `resulft` where lecturer_id=? && course_id=? order by criteria_id"; 
			input=[li,ci];
		}
		if (a==="lecture_get_courses"){
			sql= "SELECT `course_id`,`subject` FROM `coursesoflecturers` where lecturer_id=?"; 
			input=[li];
		}
		if (a==="student_get_courses"){
			sql= "SELECT `done`,`course_id`,`subject`,GROUP_CONCAT(`lecture_name` SEPARATOR ', ') as 'lectures' FROM `coursesofstudent` WHERE `student_id`=? GROUP BY course_id,student_id"; 
			input=[si];
		}	
		if (a==="get_survey_form"){
			sql="SELECT * FROM `surveyform`";
			input=[]
		}	    
    	conn.query(sql,input, function(error, rows, fields){
        	if ( error ){
        	    res.status(400).send('Error in database operation');
        	} else 
        	{
            	if(rows.length>0){
            		res.json(rows)
            	}else
            	{
            		res.send('not found data');
            	} 
        	}
    	});
	}
  	
});

app.listen(process.env.PORT ||3000);