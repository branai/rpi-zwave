var http = require('http');
var decr = require('./decr.js');
var failCount = 0;
var pulledJSON;
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

var lastChecked;
var runDownload;
var initSwitch = false;
exports.switched = function(args){
  if(!args.object.checked){
    runDownload = setInterval(function() {
      download();
      if(failCount > 10) {
        alert('DETECTED ATTACK');
        return;
      }
      if(lastChecked == undefined || pulledJSON == undefined) lastChecked = pulledJSON;
      console.log(lastChecked, pulledJSON)
      try {
        for(var i = 1; i < pulledJSON['nodes'].length; i++){
          if(pulledJSON['nodes'][i]['lastTriggerDate'] != lastChecked['nodes'][i]['lastTriggerDate']){
            if(initSwitch){
              alert("There was an alarm trip while you were gone.");
              initSwitch = false;
            } else {
              alert("ALARM TRIP");
            }
            lastChecked = pulledJSON;
            break; 
          }
        }
      } catch(e) {
     
      }
    }, 1000);
  } else {
    initSwitch = true;
    lastChecked = pulledJSON;
    clearInterval(runDownload);
  }
}
