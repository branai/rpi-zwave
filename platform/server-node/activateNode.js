var ZWave = require('openzwave-shared');
var os = require('os');
//Will be useful for when more nodes are added and they return different types
var supportedSignals = ['boolean'];
//Port for the zstick (CAN BE DIFFERENT FOR OTHER SYSTEMS), so TODO: unimportant: write method to find port for zstick in /dev/ directory
var porty = '/dev/ttyACM0';
//Data structure for all nodes on porty network
var nodes = [];

var zwave = new ZWave({
  ConsoleOutput: false
});

//Connect to zstick port
console.log("CONNECTING TO " + porty);
zwave.connect(porty);

//Any scan of any node/zstick is finished scanning
zwave.on('scan complete', function() { console.log('___scan complete___'); });

//Add a node to data structure
zwave.on('node added', function(nodeid) {
  nodes[nodeid] = {
    type: '',
    classes: {},
    ready: false,
  };
});

//^is the nodeid just a number
//Node is ready to operate
zwave.on('node ready', function(nodeid, nodeinfo) {
  nodes[nodeid]['type'] = nodeinfo.type;
  nodes[nodeid]['ready'] = true;
  console.log('DEVICE NAME: '+nodeinfo.type);
});

//Add all data structures when the nodeid datastructures are not undefined
zwave.on('value added', function(nodeid, commandclass, value) {
  if (!nodes[nodeid]['classes'][commandclass]) {
    nodes[nodeid]['classes'][commandclass] = {};
  }
  nodes[nodeid]['classes'][commandclass][value.index] = value;
});

//These states are what will be potentially read in main.js
exports.states = {
  "old":false,
  "updated":false
}

//Changine the value index to the read value
zwave.on('value changed', function(nodeid, commandclass, value) {
  if (nodes[nodeid]['ready']) {
	  oldPot = nodes[nodeid]['classes'][commandclass][value.index]['value'];
	  updatedPot = value['value'];
	  var states = new Object;
	  for(var i = 0; i < supportedSignals.length; i++) {
	      if(typeof(oldPot) == supportedSignals[i] && typeof(updatedPot) == supportedSignals[i]){
		      states.old = oldPot;
		      states.updated = updatedPot;
                      exports.states = states;
		  }
      }
  }
  nodes[nodeid]['classes'][commandclass][value.index] = value;
});

//Disconnected
process.on('SIGINT', function() {
  console.log('DISCONNECTING FROM '+porty);
  zwave.disconnect(porty);
  process.exit();
});

exports.nodes = nodes;
exports.zwave = zwave;
