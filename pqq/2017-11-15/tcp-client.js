var net = require('net');
const readline = require('readline');
var debug = require('debug')('xxx');

const rl = readline.createInterface({input: process.stdin,output: process.stdout});

var client = new net.Socket();
client.connect(8080, 'localhost', function () {
  debug('connect to the tcp server!');
  debug('please input:');debug('0: stop ; 1: close ');

  rl.question('please input: ', (answer) => {
    if (answer == '0') {
      client.write('0');
    } else if (answer == '1') {
      client.write('1');
    }
    debug(answer);
    rl.close();
  });
});
client.on('data', function(){
  debug('close server');
});