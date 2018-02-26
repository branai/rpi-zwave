const FtpSrv = require('ftp-srv');
var decr = require('./decr.js');
var fs = require('fs');
const ftpServer = new FtpSrv('ftp://54.193.44.245:7001');
ftpServer.on('login', ({connection}, resolve) => {
  resolve({root:'public/'})
  connection.on('STOR', (error, fileName) => {
     if(fileName == 'container/state.txt'){
       try{
         var str = JSON.parse(decr.decrypt(fs.readFileSync(fileName)));
         fs.writeFile('state.txt', str);
       } catch (e) {}
   });
});
ftpServer.listen();
