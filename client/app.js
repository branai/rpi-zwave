//View state with ftp://IPADDRESS:7002/public/state.json
var fs = require('fs');
var cryp = require('./decr.js')
var connect = require('./comm.js');
var want = true;
connect.take();
//var stateEnc = fs.readFileSync('state.txt');
//var stateJSON = cryp.decrypt(stateEnc, 'key.txt');
//console.log("//////////////////////",stateJSON,"/////////////////");
//TODO: make method for reading the state.json on rpi
