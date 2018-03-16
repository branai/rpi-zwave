var CryptoJS = require('crypto-js');
exports.encrypt = function(text){
  //Retrun the encrypted "text"
  return(CryptoJS.AES.encrypt(text, 'THISISTHEKEY'));
}
