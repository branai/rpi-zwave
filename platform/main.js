var clientLookout = require('./client-server/server.js');
var nodeLookout = require('./server-node/activateNode.js');
var fs = require('fs');

//Called everytime a value of a node is changed
nodeLookout.zwave.on('value changed', function() {
  var obj = checkMail();
  if(obj['protocol'] == true) {
     fs.writeFile('client-server/ftpPostOffice/public/state.json', JSON.stringify(nodeLookout.state));
  }
});

function checkMail() {
  return(JSON.parse(fs.readFileSync('client-server/ftpPostOffice/delivery/handle.json')));
}
