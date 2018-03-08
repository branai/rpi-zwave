var CryptoJS = require('crypto-js')
exports.decrypt = function(text){
  var bytes  = CryptoJS.AES.decrypt(text, 'THISISTHEKEY');
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return(plaintext)
}
