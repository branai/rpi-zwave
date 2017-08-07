var clientLookout = require('./client-server/server.js');
var nodeLookout = require('./server-node/activateNode.js');
var fs = require('fs');

//Called everytime a value of a node is changed
nodeLookout.zwave.on('value changed', function() {
  //checkMail() parses 'client-server/ftpPostOffice/delivery/handel.json'
  var obj = checkMail();
  if(obj['protocol'] == true) {
    var state = {"current":false};
    //nodeLookout.states.updated changes everytime 'value changed', see 'client-server/server.js'
    if(nodeLookout.states.updated == true){
       //TODO: make protocol that communicated server --> client
       state["current"] = true;
       fs.writeFile('client-server/ftpPostOffice/public/state.json', JSON.stringify(state));
    } else {
       state["current"] = false;
       fs.writeFile('client-server/ftpPostOffice/public/state.json', JSON.stringify(state));
    }
  }
});

function checkMail() {
  return(JSON.parse(fs.readFileSync('client-server/ftpPostOffice/delivery/handel.json')));
}