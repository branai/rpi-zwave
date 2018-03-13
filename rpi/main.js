var nodeLookout = require('./sensors.js');
var fs = require('fs');
var http = require('http');
var encr = require('./encr.js');

nodeLookout.zwave.on('value changed', function() {
  var stateEnc = encr.encrypt(JSON.stringify(nodeLookout.state));
  var options = {
     host: '54.193.44.245',
     port: 7001,
    method:'POST'
  }
  var req = http.request(options);
  req.write(require('querystring').stringify({
    'str':stateEnc.toString()
  }));
  req.end();
});
