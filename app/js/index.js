var node_static = require("node-static");
var static_files = new node_static.Server(__dirname);
var express = require('express');
var path = require('path');

module.exports = function (req, res, next) {
    var router = express.Router()
    router.get('/', function (req, res) {
        res.redirect("/public");
    });
    router.get('/public', function(req, res){
        console.log(__dirname );
        res.sendFile(path.join(__dirname + '/../templates/index.html'));
    });
    //
    return router;
}