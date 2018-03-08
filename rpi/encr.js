var CryptoJS = require('crypto-js');
exports.encrypt(text){
  return(CryptoJS.AES.encrypt(text, 'THISISTHEKEY'));
}
