var nodeLookout = require('./sensors.js');
var fs = require('fs');
var http = require('http');
var encr = require('./encr.js');

//A value of a sensor has been changed
nodeLookout.zwave.on('value changed', function() {
  //Encrypt updated state JSON
  var stateEnc = encr.encrypt(JSON.stringify(nodeLookout.state));
  var options = {
     host: '54.193.44.245',
     port: 7001,
    method:'POST'
  }
  //Send encrypted string using POST request
  var req = http.request(options);
  req.write(require('querystring').stringify({
    'str':stateEnc.toString()
  }));
  req.end();
});
