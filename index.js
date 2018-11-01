var express=require("express");
var app=express();
var server=require("http").createServer(app);
server.listen(process.env.PORT||1000);
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
});
app.get("/index.html",function (req,res) {
    res.sendFile(__dirname+"/index.html");
});
app.get("/index.html/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
});
app.get("*",function (req,res) {
  if (req.url.endsWith(".jpg")) {
    res.sendFile(__dirname+req.url);
  }else{
    res.send("not found");
  }
})