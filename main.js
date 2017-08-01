var clientLookout = require('./client-server/server.js');
var nodeLookout = require('./server-node/activateNode.js');
var fs = require('fs');


nodeLookout.zwave.on('value changed', function() {
  var obj = checkMail();
  if(obj['protocol'] == true) {
    if(nodeLookout.states.updated == true){
       console.log('movement');
    } else {
       console.log('none');
    }
  }
});

function checkMail() {
  return(JSON.parse(fs.readFileSync('client-server/ftpPostOffice/delivery/handel.json')));
}