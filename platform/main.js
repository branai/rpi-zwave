var clientLookout = require('./client-server/server.js');
var nodeLookout = require('./server-node/activateNode.js');
var fs = require('fs');

//Called everytime a value of a node is changed
nodeLookout.zwave.on('value changed', function() {
  //checkMail() parses 'client-server/ftpPostOffice/delivery/handel.json'
  var obj = checkMail();
  if(obj['protocol'] == true) {
    //nodeLookout.states.updated changes everytime 'value changed', see 'client-server/server.js'
    if(nodeLookout.states.updated == true){
       //TODO: make protocol that communicated server --> client
       console.log('movement');
    } else {
       console.log('none');
    }
  }
});

function checkMail() {
  return(JSON.parse(fs.readFileSync('client-server/ftpPostOffice/delivery/handel.json')));
}
