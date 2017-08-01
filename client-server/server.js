var ftpd = require('ftpd');
var options = {
    host: process.env.IP || '10.0.0.27',
    port: process.env.PORT || 7002,
  };

var server = new ftpd.FtpServer(options.host, {
  getInitialCwd: function () {
    return '/';
  },
  getRoot: function () {
    return process.cwd()+'/client-server/ftpPostOffice/';
  },
});

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
exports.server = server;
