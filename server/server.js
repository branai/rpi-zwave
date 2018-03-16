var http = require('http');
var fs = require('fs');
var state = 'state has not been updated yet';
var decr = require('./decr.js');
var port = 7001;
//The failcount will keep track of ip addresses with bad string history
var failCount = {};

var querystring  = require('querystring');
var server = http.createServer(function(request, response) {
  //destroy if connection is on the failcount list with 10+ fails
  if(failCount[request.connection.remoteAddress] > 10) {
      request.connection.destroy();
      return;
  }
  //just respond with state string if not POST
  if(request.method != "POST") {
    response.end(state.toString());
    return;
  }
  //If it is post, put the request string into body
  var body = '';
  request.on('data', function (data) {
    body += data;
  });
  request.on('end', function () {
    //put query string into readable format
    var post = querystring.parse(body);
    //Determine validity of file; try block will be exited if parse of decrypted does not work
    try {
      JSON.parse(decr.decrypt(post.str));
      state = post.str;
      console.log('GOOD STRING');
      failCount = {};
    } catch(e) {
      console.log('BAD STRING');
      if(failCount[request.connection.remoteAddress] == undefined){
        failCount[request.connection.remoteAddress] = 1;
      } else {
        failCount[request.connection.remoteAddress]++;
      }
    }
  });
  response.end();
});

server.listen(port, function(err) {
  console.log('Listening on port 7001');
});
