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


  //This client connection can be moved once more features are added
    var client = new ftpClient(config, options);
    client.connect(function () {
        client.download('safe', 'notValidated', {
            overwrite: 'all'
        }, function (result) {
            console.log(result);
            var str = fs.readFileSync('notValidated/state.txt').toString();
            try {
              JSON.parse(cryp.decrypt(str));
            } catch(e) {
              console.log(e +"====="+str)
              return;
            }
            var jsonString = fs.writeFile('state.json',cryp.decrypt(str));
        });
    });
    //This client connection can be moved once more features are added
