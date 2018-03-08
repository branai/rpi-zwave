var http = require('http');
var decr = require('./decr.js');

var pulledJSON;
var download = function() {
  http.getString("http://54.193.44.245:7001").then(function (r) {
    try {
      pulledJSON = JSON.parse(decr.decrypt(r.toString()));
      console.log("GOOD FILE")
    } catch(e) {alert("BAD FILE");}
  }, function (e) {
     console.log(e.message);
  });
}

var lastChecked;
var runDownload;
exports.switched = function(args){
  if(!args.object.checked){
    runDownload = setInterval(function() {
      download();
      if(lastChecked == undefined || pulledJSON == undefined) lastChecked = pulledJSON;
      console.log(lastChecked, pulledJSON)
      try {
        for(var i = 1; i < pulledJSON['nodes'].length; i++){
          if(pulledJSON['nodes'][i]['lastTriggerDate'] != lastChecked['nodes'][i]['lastTriggerDate']){
            alert("ALARM TRIP")
            lastChecked = pulledJSON;
          }
        }
      } catch(e) {

      }
    }, 1000);
  } else {
    lastChecked = pulledJSON;
    clearInterval(runDownload);
  }
}
