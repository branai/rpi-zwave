const FtpServ = require('ftp-srv');
var decr = require('./decr.js');
const ftpServer = new FtpServ('ftp://54.193.44.245:7001');
ftpServer.on('login', function({connection}, resolve) {
  resolve({root:'public'})
  var fs = require('fs');
  connection.on('STOR', function(error, fileName) { 
     if(fileName == 'container/state.txt' && fs.existsSync('public/container/state.txt')){
       var str = fs.readFileSync('public/container/state.txt');
       //check if this works to validate -->JSON.parse(decr.decrypt(str));
       fs.writeFile('public/safe/state.txt', str);
       fs.writeFile('safe.txt', str);
     }
 });
});
ftpServer.listen();

