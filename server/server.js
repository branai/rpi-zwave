var http = require('http');
var safe = "this should not be here";
var fs = require('fs');
var port = 7001;
var querystring  = require('querystring');
var server = http.createServer(function(request, response) {
  if(request.method != "POST") {
    response.end(safe.toString());
    return;
  }
  var body = '';
  request.on('data', function (data) {
    body += data;
    //TODO: Check if data is getting too large
  });
  request.on('end', function () {
    var post = querystring.parse(body);
    //TODO: check if it is parseable
    safe = post.str;
    console.log(post);
  });
  response.end();
});

server.listen(port, function(err) { console.log(`server is listening on ${port}`) });
