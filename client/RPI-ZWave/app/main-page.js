var http = require('http');
var decr = require('./decr.js');
//Fail count is just an int because ip of server will not change
var failCount = 0;
var pulledJSON = {'nodes':[]};
var lastChecked = {'nodes':[]};

//Function download gets the state json string AND determines validity
var download = function() {
  http.getString("http://54.193.44.245:7001").then(function (response) {
    try {
      pulledJSON = JSON.parse(decr.decrypt(response.toString()));
      console.log("GOOD FILE");
      failCount = 0;
    } catch(e) {
      console.log("BAD FILE");
      failCount++;
    }
  }, function (e) {
     console.log(e.message);
  });
}

var runDownload;
var initSwitch = 0;
//When switch event occurs...
exports.switched = function(args){
  //...check to make sure switch is on
  if(!args.object.checked){
    //Every second the client will download from intermed.
    runDownload = setInterval(function() {
      download();
      if(failCount > 10) {
        alert('DETECTED ATTACK');
        return;
      }
      if(pulledJSON['nodes'].length != lastChecked['nodes'].length) {
          lastChecked = pulledJSON;
      }
      //Compare with last download to see if we need to alert
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
    //...or the alarm is switched off in that case stop pulling data
    initSwitch = 1;
    lastChecked = pulledJSON;
    clearInterval(runDownload);
  }
}
