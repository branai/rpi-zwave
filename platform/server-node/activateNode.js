var ZWave = require('openzwave-shared');
var os = require('os');
var fs = require('fs');
//Port for the zstick (CAN BE DIFFERENT FOR OTHER SYSTEMS), so TODO: unimportant: write method to find port for zstick in /dev/ directory
var porty = '/dev/ttyACM0';
//Data structure for all nodes on porty network
var state = {
  "triggers":[],
  "nodes":[]
}

var zwave = new ZWave({
  ConsoleOutput: false
});

//Connect to zstick port
console.log("CONNECTING TO " + porty);
zwave.connect(porty);

//Any scan of any node/zstick is finished scanning
zwave.on('scan complete', function() { console.log('___scan complete___'); });

//Add a node to data structure
zwave.on('node added', function(id) {
  //TODO:Should i add manufacturer
  state['nodes'][id]={
    "id": id,
    "name": '',
    "battery": '',
    "date": '',
    "ready": false
  };
});

//Node is ready to operate
zwave.on('node ready', function(id, nodeinfo) {
  state['nodes'][id]['name'] = nodeinfo.type;
  state['nodes'][id]['date'] = Date();
  state['nodes'][id]['ready'] = true;
  console.log('DEVICE NAME: '+nodeinfo.type);
});

//Changine the value index to the read value
zwave.on('value changed', function(id, commandclass, value) {
  if(value['label']=='Powerlevel'){ state['nodes'][id]['battery']=value['value']; };
  if ((value['label']=='Sensor')&&(typeof(value['value'])=="boolean")&&(state['nodes'][id]['ready'])) {
    if(typeof(value['value'])=="boolean"){
      var date = Date();
      state['triggers'].push({
        "time":date,
        "nodeId":state['nodes'][id]['id'],
        "state":value['value']
      });
    }	 
  }
});

//Disconnected
process.on('SIGINT', function() {
console.log(JSON.stringify(state));
  console.log('DISCONNECTING FROM '+porty);
  zwave.disconnect(porty);
  process.exit();
});

exports.state = state;
exports.zwave = zwave;
