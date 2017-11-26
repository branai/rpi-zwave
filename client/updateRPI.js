var ftpClient = require('ftp-client');
var fs = require('fs');
var os = require('os');
var network = os.networkInterfaces();
var config = {
    host: '10.252.35.9', //<-- ip to ftp to
    port: 7002 //<-- ftp port server is taking ftp requests
}

var options = {
    logging: 'basic'
}

var myInfo = {
    ip: network.en0[1]['address'],
    ma: network.en0[1]['mac']
}

//Run protocol that sends the protocol and some info (main.js)
exports.send = function(protocol) {
    //Read 'mail/handle.json'
    var obj1 = function () {return(JSON.parse(fs.readFileSync('mail/handle.json')))};
    var obj = obj1();
    //Update 'mail/handle.json' info
    obj['protocol'] = protocol;
    obj['info'] = myInfo;
    console.log(obj);
    //Update 'mail/handle.json'
    var json = JSON.stringify(obj);
    fs.writeFile('mail/handle.json', json);
    //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.upload(['mail/handle.json'], 'delivery', {
            baseDir: 'mail',
            overwrite: 'older'
        }, function (result) {
            console.log(result);
        });
    });
    //End of client connection
};

exports.take = function() {
  //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.download('public/state.json', 'public', {
            overwrite: 'older'
        }, function (result) {
            console.log(result);
        });
    });
  //This client connection can be moved once more features are added
};


//Both send and take will be called by frontend
