var debug = require('debug')('xxx');
const fs = require('fs');
const ws = fs.createWriteStream('demo.txt');
const rs = fs.createReadStream('demo.txt');

var writeBuff = Buffer.alloc(22);
writeBuff.writeUInt32BE(100, 0);
writeBuff.writeInt32BE(-100, 4);
writeBuff.writeUInt8(100, 8);
writeBuff.writeInt8(-100, 9);
writeBuff.writeFloatBE(77.34, 10);
writeBuff.writeDoubleBE(-77.564, 14);

var readBuff = [];

ws.end(writeBuff, function () {
  debug('log:' +'文件已导入。。。。');
  rs.on('readable', function () {
    var data = rs.read();
    if (data) {
      readBuff.push(data);
    }
  });
  rs.on('end', function () {
    readBuff = Buffer.concat(readBuff);
    debug('log:' +'UInt32 = ' + readBuff.readInt32BE(0));
    debug('log:' +'Int32 = ' + readBuff.readInt32BE(4));
    debug('log:' +'UInt8 = ' + readBuff.readUInt8(8));
    debug('log:' +'Int8 = ' + readBuff.readInt8(9));
    debug('log:' +'Float = ' + readBuff.readFloatBE(10));
    debug('log:' +'Double = ' + readBuff.readDoubleBE(14));
  });
});