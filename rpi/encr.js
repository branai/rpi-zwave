var CryptoJS = require('crypto-js');
exports.encrypt = function(text){
  return(CryptoJS.AES.encrypt(text, 'THISISTHEKEY'));
}
