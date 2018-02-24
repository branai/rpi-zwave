var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

exports.decrypt = function(text) {
  var key = fs.readFileSync('key.txt', function(){});
  var decipher = crypto.createDecipher('aes-256-ctr',key)
  var stateDec = decipher.update(text,'hex','utf8')
  return stateDec;
}
