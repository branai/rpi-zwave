var CryptoJS = require('crypto-js');
exports.decrypt = function(text){
  //Return decrypted text as string
  var bytes  = CryptoJS.AES.decrypt(text.toString(), 'THISISTHEKEY');
  return(bytes.toString(CryptoJS.enc.Utf8));
}
