var debug = require('debug')('uint32');

const fs = require('fs');
const ws = fs.createWriteStream('uint32.txt');
const rs = fs.createReadStream('uint32.txt');

const buf = Buffer.allocUnsafe(4);

//---buf.writeUInt32BE(value, offset[, noAssert])写入大端
buf.writeUInt32BE(0x11, 0);
ws.write(buf);

//---buf.readUInt32BE(offset[, noAssert])
rs.on('data', function (data) {
  debug('log: '+buf.readUInt32BE(data));
});


//---buf.writeUInt32BE(value, offset[, noAssert])写入小端
// buf.writeUInt32LE(0xfeedface,0);