var express = require("express");
var app = express();
var http_serv = require("http").Server(app);
var io = require("socket.io")(http_serv);
var port = process.env.PORT || 8000;
var host = "localhost";

var index = require("./app/js/index.js");
var handleIo = require("./app/js/handleIo.js");

app.use(express.static(__dirname));
app.use("/", index());


http_serv.listen(port, function () {
    console.info("Sever started on port: '" + port +"'");
});

io.on('connection', handleIo);