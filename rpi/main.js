var nodeLookout = require('./sensors.js');
var fs = require('fs');
var ftpClient = require('ftp-client');
var cryp = require('./encr.js');

//Called everytime a value of a node is changed
nodeLookout.zwave.on('value changed', function() {
    var stateEnc = cryp.encrypt(JSON.stringify(nodeLookout.state));
     fs.writeFile('container/state.txt', stateEnc);
     var config = {
       host: '54.193.44.245', //<-- ip to ftp to
       port: 7001 //<-- ftp port server is taking ftp requests
   }

   var options = {
       logging: 'basic'
   }
       var client = new ftpClient(config, options);
       client.connect(function () {
           client.upload(['container/state.txt'], '.', {
               baseDir: '.',
               overwrite: 'all'
           }, function (result) {
               console.log(result);
           });
       });
  //}
});
