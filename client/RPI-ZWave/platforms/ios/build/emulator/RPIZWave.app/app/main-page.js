var http = require('http');
var decr = require('./decr.js');

var pulledJSON;
var download = function() {
  http.getString("http://54.193.44.245:7001").then(function (r) {
    pulledJSON = r;
  }, function (e) {
     console.log(e.message);
  });
}

var runDownload;
exports.switched = function(args){
  if(!args.object.checked){
    runDownload = setInterval(function() {
      download();
      console.log(decr.decrypt(pulledJSON));
    }, 1000);
  } else {
    clearInterval(runDownload);
  }
}
