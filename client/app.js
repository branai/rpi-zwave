//View state with ftp://IPADDRESS:7002/public/state.json
var fs = require('fs');
var cryp = require('./decr.js')
var connect = require('./comm.js');
var want = true;
connect.send();
//TODO: make method for reading the state.json on rpi
