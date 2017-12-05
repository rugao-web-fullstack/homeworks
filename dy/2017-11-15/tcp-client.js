var net = require('net');
const readline = require('readline');
var debug = require('debug')('log');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var client = new net.Socket();
client.connect(8080, 'localhost', function () {
  debug('log' + 'connect to the tcp server!');
  debug('log' + 'if you want to stop,please input:');
  debug('log' + '0: stop process; 1: close server');

  rl.question('please input: ', (answer) => {
    if (answer == '0') {
      client.write('0');
    } else if (answer == '1') {
      client.write('1');
    }
    debug('log' + answer);
    rl.close();
  });
});
client.on('data', function (data) {
  debug('log' + data);
  debug('log' + 'close server');
});
