var debug = require('debug')('log');
const net = require('net');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new net.Socket();
client.connect(8080, 'localhost', () => {
  rl.on('line', (line) => {
    client.write(line);
  });
});
client.on('data', (data) => {
  debug('log:' + data.toString());
});
client.on('end', () => {
  process.exit();
});
client.on('error', function () {
  process.exit();
});