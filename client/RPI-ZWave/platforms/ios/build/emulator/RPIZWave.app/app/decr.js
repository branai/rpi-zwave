var nst = require('nativescript-toolbox');
exports.decrypt = function(text){
  var key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTi32Lm+SR+GDza8LquZ9XKLygViElmYgmiAmzhwZWrM7t+OUn1DWrIO6aSiWflNp7E3k4IK13uWKXI9oadBfImIy3dmocrJXi8tOhWN1hDLIQgFisRF4RcLJGUipzUsqHrXeDOenPfs0Q7M+fzY00CJHvfNsZRU3N7ibChjhWNwIDAQAB';
  var decrypted = nst.decrypt(key, text);
  return(decrypted)
}