const fs = require('fs');
const ws = fs.createWriteStream('float.txt');
const rs = fs.createReadStream('float.txt');
var debug = require('debug')('log');

const buf = Buffer.allocUnsafe(4);

//---buf.writeFloatBE
buf.writeFloatBE(0x24, 0);
ws.write(buf);

//---buf.readFloatBE
rs.on('data', function(data) {
  debug('log:' + buf.readFloatBE(data));
});
