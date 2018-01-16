var ftpClient = require('ftp-client');
var fs = require('fs');
var os = require('os');
var config = {
    host: '52.53.80.40', //<-- ip to ftp to
    port: 7001 //<-- ftp port server is taking ftp requests
}

var options = {
    logging: 'basic'
}

var myInfo = {
    ip: 'ip'/*network.en0[1]['address']*/,
    ma: 'mac'/*network.en0[1]['mac']*/

}

//Run protocol that sends the protocol and some info (main.js)
exports.send = function(protocol) {
    //Read 'mail/handel.json'
    var obj1 = function () {return(JSON.parse(fs.readFileSync('client-send/handle.json')))};
    var obj = obj1();
    //Update 'mail/handle.json' info
    obj['protocol'] = protocol;
    obj['info'] = myInfo;
    console.log(obj);
    //Update 'mail/handle.json'
    var json = JSON.stringify(obj);
    fs.writeFile('client-send/handle.json', json);
    //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.upload(['client-send/handle.json'], 'server-mail', {
            baseDir: 'client-send',
            overwrite: 'older'
        }, function (result) {
            console.log(result);
        });
    });
    //End of client connection
};

/*exports.take = function() {
  //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.download('server-mail/state.json', 'rpi-recieve', {
            overwrite: 'older'
        }, function (result) {
            console.log(result);
        });
    });
    //This client connection can be moved once more features are added
};*/


//Both send and take will be called by frontend
