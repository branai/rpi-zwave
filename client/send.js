var http = require('http');
var fs = require('fs');
var os = require('os');
var options = {
   host: '54.193.44.245', //<-- ip to ftp to
   port: 7001, //<-- ftp port server is taking ftp requests
  method:'POST'
}
var req = http.request(options);
var str;
req.write(require('querystring').stringify({
  'str':str
}));
req.end();
