var aesjs = require('aes-js');
exports.encrypt = function(text){
  var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
  var textBytes = aesjs.utils.utf8.toBytes(text);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key);
  return(aesCtr.encrypt(textBytes));
}
