var nodeLookout = require('./sensors.js');
var fs = require('fs');
var http = require('http');
var encr = require('./encr.js');

//Called everytime a value of a node is changed
nodeLookout.zwave.on('value changed', function() {
  var stateEnc = encr.encrypt(JSON.stringify(nodeLookout.state));
  var options = {
     host: '54.193.44.245', //<-- ip to ftp to
     port: 7001, //<-- ftp port server is taking ftp requests
    method:'POST'
  }
  var req = http.request(options);
  req.write(require('querystring').stringify({
    'str':stateEnc.toString()
  }));
  req.end();
});
