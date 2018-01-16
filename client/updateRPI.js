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
<<<<<<< HEAD
    ip: 'ip'/*network.en0[1]['address']*/,
    ma: 'ma'/*network.en0[1]['mac']*/
=======
    ip: /*network.eth0[1]['address']*/'20',
    ma: network.eth0[1]['mac']
>>>>>>> 625ec59df5b7269f8249d9dc81fd2df99522e3d1
}

//Run protocol that sends the protocol and some info (main.js)
exports.send = function(protocol) {
<<<<<<< HEAD
    //Read 'mail/handel.json'
    var obj1 = function () {return(JSON.parse(fs.readFileSync('send/handel.json')))};
=======
    //Read 'mail/handle.json'
    var obj1 = function () {return(JSON.parse(fs.readFileSync('mail/handle.json')))};
>>>>>>> 625ec59df5b7269f8249d9dc81fd2df99522e3d1
    var obj = obj1();
    //Update 'mail/handle.json' info
    obj['protocol'] = protocol;
    obj['info'] = myInfo;
    console.log(obj);
    //Update 'mail/handle.json'
    var json = JSON.stringify(obj);
<<<<<<< HEAD
    fs.writeFile('send/handel.json', json);
    //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.upload(['send/handel.json'], 'delivery', {
            baseDir: 'send',
            overwrite: 'all'
=======
    fs.writeFile('mail/handle.json', json);
    //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.upload(['mail/handle.json'], 'delivery', {
            baseDir: 'mail',
            overwrite: 'older'
>>>>>>> 625ec59df5b7269f8249d9dc81fd2df99522e3d1
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
