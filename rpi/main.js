var nodeLookout = require('./server-node/activateNode.js');
var fs = require('fs');
var ftpClient = require('ftp-client')

//Called everytime a value of a node is changed
nodeLookout.zwave.on('value changed', function() {
  //var obj = checkMail();
  //if(obj['protocol'] == true) {
     fs.writeFile('rpi-send/state.json', JSON.stringify(nodeLookout.state));
     var config = {
       host: '52.53.80.40', //<-- ip to ftp to
       port: 7001 //<-- ftp port server is taking ftp requests
   }

   var options = {
       logging: 'basic'
   }
       var client = new ftpClient(config, options);
       client.connect(function () {
           client.upload(['rpi-send/state.json'], 'server-mail', {
               baseDir: 'server-mail',
               overwrite: 'older'
           }, function (result) {
               console.log(result);
           });
       });
  //}
});

function checkMail() {
  return(JSON.parse(fs.readFileSync('rpi-take/handel.json')));
}
