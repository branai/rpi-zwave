//View state with ftp://IPADDRESS:7002/public/state.json

var connect = require('./updateRPI');
var want = true;
connect.send(want);

//TODO: make method for reading the state.json on rpi
