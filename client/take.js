var http = require('http');
var fs = require('fs');
var decr = require('./decr.js');
var file = fs.createWriteStream('file.txt');
http.get("http://54.193.44.245:7001", function(response) {
  response.on('data', function(chunk) {
    var stateDec = decr.decrypt(chunk.toString());
    fs.writeFileSync('state.json', stateDec);
  });
}).on('error', function(e){ console.log(e.message); });
