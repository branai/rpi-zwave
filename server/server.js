var http = require('http');
var fs = require('fs');
var state = 'state has not been updated yet';
var decr = require('./decr.js');
var port = 7001;
var failCount = {};

var querystring  = require('querystring');
var server = http.createServer(function(request, response) {
  if(failCount[request.connection.remoteAddress] > 10) {
      response.destroy();
      return;
  }
  if(request.method != "POST") {
    response.end(state.toString());
    return;
  }
  var body = '';
  request.on('data', function (data) {
    body += data;
  });
  request.on('end', function () {
    var post = querystring.parse(body);
    try {
      JSON.parse(decr.decrypt(post.str));
      state = post.str;
      console.log('GOOD FILE');
      failCount = {};
    } catch(e) { 
      console.log('BAD FILE');
      if(failCount[request.connection.remoteAddress] == undefined){
        failCount[request.connection.remoteAddress] = 1;
      } else {
        failCount[request.connection.remoteAddress]++;
      }
    }
  });
  response.end();
});

server.listen(port, function(err) { console.log(`server is listening on ${port}`) });
