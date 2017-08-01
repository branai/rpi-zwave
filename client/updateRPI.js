var ftpClient = require('ftp-client');
var config = {
    host: '10.0.0.27',
    port: 7002
}

var options = {
    logging: 'basic'
}

exports.send = function(protocol,info) {
    var fs = require('fs');
    var obj1 = function () {return(JSON.parse(fs.readFileSync('mail/handel.json')))}; 
    var obj = obj1();
    obj['protocol'] = protocol;
    obj['info'] = info;
    var json = JSON.stringify(obj); 
    fs.writeFile('mail/handel.json', json); 
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.upload(['mail/handel.json'], 'delivery', {
            baseDir: 'mail',
            overwrite: 'older'
        }, function (result) {
            console.log(result);
        });
    });
};

exports.take = function() {
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.download('public/state.json', 'public', {
            overwrite: 'older'
        }, function (result) {
            console.log(result);
        }); 
    });
};
