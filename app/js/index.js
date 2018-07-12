var node_static = require("node-static");
var static_files = new node_static.Server(__dirname);

module.exports = function (req, res, next) {
    next();
}