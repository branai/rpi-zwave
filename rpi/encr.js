var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

exports.encrypt = function(str, pathy) {
    var key = fs.readFileSync(pathy, "utf8");
    var buffer = new Buffer(str);
    var encrypted = crypto.publicEncrypt(key, buffer);
    return encrypted.toString("base64");
};
