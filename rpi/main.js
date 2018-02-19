var nodeLookout = require('./activateNode.js');
var fs = require('fs');
var ftpClient = require('ftp-client');
var cryp = require('./encr.js');

//Called everytime a value of a node is changed
nodeLookout.zwave.on('value changed', function() {
  //var obj = checkMail();
  //if(obj['protocol'] == true) {
    var stateEnc = cryp.encrypt(JSON.stringify(nodeLookout.state));
     fs.writeFile('state.txt', stateEnc);
     var config = {
       host: '18.144.66.160', //<-- ip to ftp to
       port: 7001 //<-- ftp port server is taking ftp requests
   }

   var options = {
       logging: 'basic'
   }
       var client = new ftpClient(config, options);
       client.connect(function () {
           client.upload(['state.txt'], '.', {
               baseDir: '.',
               overwrite: 'all'
           }, function (result) {
               console.log(result);
           });
       });
  //}
});

function checkMail() {
  return(JSON.parse(fs.readFileSync('handle.json')));
}
