var debug = require('debug')('xxx');
var fs = require('fs');
var ws = fs.createWriteStream('num.txt');
var rs = fs.createReadStream('num.txt');

var buf = Buffer.alloc(22);
buf.writeUInt32BE(16, 0);
buf.writeInt32BE(-16, 4);
buf.writeUInt8(16, 8);
buf.writeInt8(-16, 9);
buf.writeFloatBE(16.16, 10);
buf.writeDoubleBE(-1616.1616, 14);

var readBuff = [];

ws.end(buf, function () {
  rs.on('readable', function () {
    var data = rs.read();
    if (data) {
      readBuff.push(data);
    }
  });

  rs.on('end', function () {
    readBuff = Buffer.concat(readBuff);
    debug('log' + '读出的值为：');
    debug('log' + 'UInt32 = ' + readBuff.readInt32BE(0));
    debug('log' + 'Int32 = ' + readBuff.readInt32BE(4));
    debug('log' + 'UInt8 = ' + readBuff.readUInt8(8));
    debug('log' + 'Int8 = ' + readBuff.readInt8(9));
    debug('log' + 'Float = ' + readBuff.readFloatBE(10));
    debug('log:' + 'Double = ' + readBuff.readDoubleBE(14));
  });

}); 
