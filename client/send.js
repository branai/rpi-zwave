var ftpClient = require('ftp-client');
var fs = require('fs');
var os = require('os');
var cryp = require('./decr.js');
var config = {
    host: '54.193.44.245', //<-- ip to ftp to
    port: 7001 //<-- ftp port server is taking ftp requests
}

var options = {
    logging: 'basic'
}

//Run protocol that sends the protocol and some info (main.js)
var client = new ftpClient(config, options);
client.connect(function () {
    client.upload(['containers/state.txt'], '.', {
        baseDir: '.',
        overwrite: 'older'
    }, function (result) {
        console.log(result);
    });
});
