exports.decrypt = function(bytes){
var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
var aesCtr = new aesjs.ModeOfOperation.ctr(key);
var decryptedBytes = aesCtr.decrypt(bytes);
var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
return(decryptedText);
}
