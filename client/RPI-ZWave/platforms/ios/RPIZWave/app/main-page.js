var http = require('http');
var decr = require('./decr.js');
var failCount = 0;
var pulledJSON = {'nodes':[]};
var download = function() {
  http.getString("http://54.193.44.245:7001").then(function (r) {
    try {
      pulledJSON = JSON.parse(decr.decrypt(r.toString()));
      console.log("GOOD FILE");
      failCount = 0;
    } catch(e) {
      console.log("BAD FILE");
    }
  }, function (e) {
     console.log(e.message);
  });
}

var lastChecked = {'nodes':[]};
var runDownload;
var initSwitch = 0;
exports.switched = function(args){
  if(!args.object.checked){
    runDownload = setInterval(function() {
      download();
      if(failCount > 10) {
        alert('DETECTED ATTACK');
        return;
      }
        if(pulledJSON['nodes'].length != lastChecked['nodes'].length) {
            lastChecked = pulledJSON;
        }
        for(var i = 1; i < pulledJSON['nodes'].length; i++){
          if(pulledJSON['nodes'][i]['lastTriggerDate'] != lastChecked['nodes'][i]['lastTriggerDate']){
            if(initSwitch == 2){
              alert("There was an alarm trip while you were gone.");
            } else {
              alert("ALARM TRIP");
            }
            lastChecked = pulledJSON;
            break;
          }
        }
        if(initSwitch == 1){
          initSwitch = 2;
        } else {
          initSwitch = 0;
        }
    }, 1000);
  } else {
    initSwitch = 1;
    lastChecked = pulledJSON;
    clearInterval(runDownload);
  }
}
