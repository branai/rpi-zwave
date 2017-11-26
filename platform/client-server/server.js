var ftpd = require('ftpd');
var options = {
    host: process.env.IP || '10.252.35.9', //<-- localhost ip address
    port: process.env.PORT || 7002, //<-- port 7002 can ftp
  };

var server = new ftpd.FtpServer(options.host, {
  getRoot: function () {
    return process.cwd()+'/client-server/ftpPostOffice/'; //<-- all communication takes place in this directory
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

server.debugging = 4;
server.listen(options.port);
//Make server public for potential changes to the .on methods
exports.server = server;
