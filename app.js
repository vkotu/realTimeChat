var express = require("express");
var app = express();
var http_serv = require("http").Server(app);
var io = require("socket.io")(http_serv);
var port = 8000;
var host = "localhost";

var index = require("./app/js/index.js")

app.use("/", index);

app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/app/templates/index.html');
});


http_serv.listen(port, host, function () {
    console.info("Sever started on host: '" + host + "' port: '" + port +"'");
});