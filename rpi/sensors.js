var ZWave = require('openzwave-shared');
var os = require('os');
var fs = require('fs');
var porty = '/dev/ttyACM0';
//The reset variable determines if this run is the initial run or not and must be changed manually
var reset = true;
var state;
if(reset){
  state = {
    "nodes":[]
  }
} else {
  function checkMail() {
    return(JSON.parse(fs.readFileSync('state.json')));
  }
  state = checkMail();
}

var highestId = state['nodes'].length;

var zwave = new ZWave({ConsoleOutput:false});
//Connect to port with ZStick
console.log("CONNECTING TO " + porty);
zwave.connect(porty);

zwave.on('scan complete', function() {
  console.log('___scan complete___');
});

//Create blank sensor object
zwave.on('node added', function(id) {
  if(id > highestId){
    state['nodes'][id]={
      "id": id,
      "name": '',
      "battery": '',
      "date": '',
      "ready": false,
      "lastTriggerDate": null
    };
  }
});

//Change some constant sensor attributes
zwave.on('node ready', function(id, nodeinfo) {
  state['nodes'][id]['name'] = nodeinfo.type;
  state['nodes'][id]['date'] = Date();
  state['nodes'][id]['ready'] = true;
  state['nodes'][id]['lastTriggerDate'] = Date();
  console.log('DEVICE NAME: '+nodeinfo.type);
});

//Update the state object
zwave.on('value changed', function(id, commandclass, value) {
  //Battery value changed
  if(value['label']=='Powerlevel'){
    state['nodes'][id]['battery']=value['value'];
  };
  //Sensor value changed
  if ((value['label']=='Sensor')&&(typeof(value['value'])=="boolean")&&(state['nodes'][id]['ready'])) {
    if(value['value']){
      state['nodes'][id]['lastTriggerDate'] = Date();
    }
  }
  //THIS WHERE STATE IS STORED LOCALLY. DO NOT MOVE STATE.JSON
  fs.writeFile('state.json', JSON.stringify(state));
});

process.on('SIGINT', function() {
  console.log(JSON.stringify(state));
  console.log('DISCONNECTING FROM '+porty);
  zwave.disconnect(porty);
  process.exit();
});

exports.state = state;
exports.zwave = zwave;
