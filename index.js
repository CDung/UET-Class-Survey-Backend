var mysql = require('mysql');

var con = mysql.createConnection({
  host: "db4free.net",
  user: "dungntc108",
  password: "12345678",
  database: "class_survey"
});

con.connect(function(err) {
  if (err) throw err;
  var inp='id';
  var sql = "SELECT * FROM `resulft`";
  con.query(sql,inp, function (err, rows,fields) {
    if (err) throw err;
    console.log(rows);
  });
});