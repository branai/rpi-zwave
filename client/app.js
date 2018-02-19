//View state with ftp://IPADDRESS:7002/public/state.json

var connect = require('./updateRPI');
var want = true;
connect.take();

//TODO: make method for reading the state.json on rpi
