var CryptoJS = require('crypto-js');
exports.decrypt = function(text){
  var bytes  = CryptoJS.AES.decrypt(text, 'THISISTHEKEY');
  return(bytes.toString(CryptoJS.enc.Utf8));
}
