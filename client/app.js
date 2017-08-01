var connect = require('./updateRPI');
var dns = require('dns');
var os = require('os');
/*
  Do something here for testings sake
*/
var myip
dns.lookup(os.hostname(), function (err, add, fam) {
    myip = add
    endLookup();
})

function endLookup() {
  var want = true;
  connect.send(want, myip);
}
//while(want){connect.take();}


//If you want to recieve directions
