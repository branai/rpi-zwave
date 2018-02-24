var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

exports.encrypt = function(text){
  var key = fs.readFileSync('key.txt', function(){});
  var cipher = crypto.createCipher('aes-256-ctr',key)
  var stateEnc = cipher.update(text,'utf8','hex');
  return stateEnc;
}
