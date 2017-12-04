const fs = require('fs');
const ws = fs.createWriteStream('uint32.txt');
const rs = fs.createReadStream('uint32.txt');

var debug = require('debug')('log');
const buf = Buffer.allocUnsafe(4);

buf.writeUInt32BE(0x123134, 0);
ws.write(buf);

//---buf.readUInt32BE(offset[, noAssert])
rs.on('data', function(data) {
  debug('log:' + buf.readUInt32BE(data));
});
