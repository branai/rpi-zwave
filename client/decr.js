var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

exports.decrypt = function(encrypted, pathy) {
    var key = fs.readFileSync(pathy, "utf8");
    var buffer = new Buffer(encrypted, "base64");
    var decrypted = crypto.privateDecrypt(key, buffer);
    return decrypted.toString("utf8");
};
