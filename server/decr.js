var crypto = require("crypto-js");
var path = require("path");
var fs = require("fs");

exports.decrypt = function(text) {
  var key = fs.readFileSync('key.txt');
  var decipher = crypto.AES.decrypt('aes-256-ctr',key).toString(crypto.enc.Utf8);
  return decipher;
}
