var connect = require('./updateRPI');
var dns = require('dns');
var os = require('os');
//TODO: make method to get client's mac address (unique)
var myip;
dns.lookup(os.hostname(), function (err, add, fam) {
    myip = add;
    endLookup();
})

function endLookup() {
  //want should be true:get values, false:ignore values
  var want = true;
  connect.send(want, myip);
}

//TODO: make method for reading the state.json on rpi
