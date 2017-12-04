const fs = require('fs');
const rs = fs.createReadStream('demo.txt');
var debug = require('debug')('xxx');

var readBuff = [];

rs.on('readable', function() {
  var data = rs.read();
  if(data) {
    readBuff.push(data);
  }
});
rs.on('end', function() {
  readBuff = Buffer.concat(readBuff);
  debug('log:' + 'UInt32 = ' + readBuff.readUInt32BE(0).toString(16));
  debug('log:' + 'Int32 = ' + readBuff.readInt32BE(4));
  debug('log:' + 'UInt8 = ' + readBuff.readUInt8(8));
  debug('log:' + 'Int8 = ' + readBuff.readInt8(9));
  debug('log:' + 'Float = ' + readBuff.readFloatBE(10));
  debug('log:' + 'Double = ' + readBuff.readDoubleBE(14));
});