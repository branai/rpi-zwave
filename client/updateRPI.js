var ftpClient = require('ftp-client');
var fs = require('fs');
var config = {
    host: '10.0.0.27', //<-- ip to ftp to
    port: 7002 //<-- ftp port server is taking ftp requests
}

var options = {
    logging: 'basic'
}
//Run protocol that sends the protocol and some info (main.js)
exports.send = function(protocol,info) {
    //Read 'mail/handel.json'
    var obj1 = function () {return(JSON.parse(fs.readFileSync('mail/handel.json')))};
    var obj = obj1();
    //Update 'mail/handel.json' info
    obj['protocol'] = protocol;
    obj['info'] = info;
    //Update 'mail/handel.json'
    var json = JSON.stringify(obj);
    fs.writeFile('mail/handel.json', json);
    //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.upload(['mail/handel.json'], 'delivery', {
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
