var ftpd = require('ftpd');
var fs = require('fs');
var cryp = require('./decr.js');
var options = {
    host: process.env.IP || '54.193.44.245', //<-- localhost ip address
    port: process.env.PORT || 7001, //<-- port 7002 can ftp
};

var server = new ftpd.FtpServer(options.host, {
  getRoot: function () {
    return process.cwd()+'/public/'; //<-- all communication takes place in this directory
  },
  getInitialCwd: function () {
    return '/'; //<-- starting directory relative to getRoot
  },
});

//This method authorizes EVERYONE who connects, so TODO: create a authentication system based off of a attribute in handle.json
server.on('client:connected', function (connection) {
  connection.on('command:user', function (user, success, failure) {
    success();
  });
  connection.on('command:pass', function (pass, success, failure) {
    success('anonymous');
  });
});

server.on('error', function (error) {
  console.log('FTP Server error:', error);
});

fs.watchFile('public/container/state.txt', function(){
    try {
      JSON.parse(cryp.decrypt(fs.readFileSync('public/container/state.txt', function(){})));
    } catch(e) {
      fs.writeFile('public/container/state.txt', fs.readFileSync('untouchable/savedState.txt', function(){}));
      return;
    }
    fs.writeFile('untouchable/savedState.txt', fs.readFileSync('public/container/state.txt', function(){}));
});

server.debugging = 4;
server.listen(options.port);
//Make server public for potential changes to the .on methods
exports.server = server;
