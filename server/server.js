var http = require('http');
var state = "this should not be here";
var fs = require('fs');
var decr = require('./decr.js');
var port = 7001;
var querystring  = require('querystring');
var server = http.createServer(function(request, response) {
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
    } catch(e) { console.log('BAD FILE'); }
  });
  response.end();
});

server.listen(port, function(err) { console.log(`server is listening on ${port}`) });
