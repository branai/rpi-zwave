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

var myInfo = {
    ip: 'ip'/*network.en0[1]['address']*/,
    ma: 'ma'/*network.en0[1]['mac']*/

}

//Run protocol that sends the protocol and some info (main.js)
exports.send = function(protocol) {
    //Read 'mail/handle.json'
    var obj1 = function () {return(JSON.parse(fs.readFileSync('handle.json')))};
    var obj = obj1();
    //Update 'mail/handle.json' info
    obj['protocol'] = protocol;
    obj['info'] = myInfo;
    console.log(obj);
    //Update 'mail/handle.json'
    var json = JSON.stringify(obj);
    fs.writeFile('handle.json', json);
    //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.upload(['handle.json'], '.', {
            baseDir: '.',
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
        client.download('state.txt', 'notValidated', {
            overwrite: 'all'
        }, function (result) {
            console.log(result);
            var str = fs.readFileSync('notValidated/state.txt').toString();
            try {
              JSON.parse(cryp.decrypt(str));
            } catch(e) {
              return;
            }
            var jsonString = fs.writeFile('state.json',cryp.decrypt(str));
        });
    });
    //This client connection can be moved once more features are added
};


//Both send and take will be called by frontend
