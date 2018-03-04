var http = require('http');
var fs = require('fs');
var port = 7001;
var querystring  = require('querystring');
var server = http.createServer(function(request, response) {
  if(request.method != "POST") {
    response.end(fs.readFileSync("state.txt"));
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
    fs.writeFileSync("state.txt", post);
  });
  response.end();
});

server.listen(port, function(err) { console.log(`server is listening on ${port}`) });

/*const FtpServ = require('ftp-srv');
var decr = require('./decr.js');
const ftpServer = new FtpServ('ftp://54.193.44.245:7001');
ftpServer.on('login', function({connection}, resolve) {
  resolve({root:'public'})
  var fs = require('fs');
  connection.on('STOR', function(error, fileName) {
     if(fileName == 'container/state.txt' && fs.existsSync('public/container/state.txt')){
       var str = fs.readFileSync('public/container/state.txt');
       //check if this works to validate -->JSON.parse(decr.decrypt(str));
       fs.writeFile('public/safe/state.txt', str);
       fs.writeFile('safe.txt', str);
     }
 });
});
ftpServer.listen();
*/
