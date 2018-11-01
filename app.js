var express=require("express");
var app=express();
var fs=require("fs");
var server=require("http").createServer(app);
server.listen(process.env.PORT||1000);
var dataIndex=fs.readFileSync(__dirname+"/index.html","utf-8");
app.get("/",function (req,res) {
    res.send(dataIndex);
});
app.get("/index.html",function (req,res) {
    res.send(dataIndex);
});
app.get("/index.html/",function (req,res) {
    res.send(dataIndex);
});
app.get("*",function (req,res) {
  if (req.url.endsWith(".jpg")) {
    res.sendFile(__dirname+req.url);
  }else{
    res.send("not found");
  }
})