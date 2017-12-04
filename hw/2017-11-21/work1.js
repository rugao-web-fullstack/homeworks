var debug = require('debug')('xxx');
const fs = require('fs');

const ws = fs.createWriteStream('file.txt');
const rs = fs.createReadStream('file.txt');
let buf = Buffer.alloc(32);

buf.writeUInt32BE(12341234);
buf.writeInt32BE(-20, 4);
buf.writeUInt8(60, 8);
buf.writeInt8(-60, 9);
buf.writeFloatBE(88.99, 10);
buf.writeDoubleBE(-88.88, 14);

debug('log:' +buf);
ws.write(buf);


var readBuf = [];


ws.end(buf, function() {
  debug('log:' +'文件已进入文件');
  rs.on('readable', function() {
    var data = rs.read();
    if (data) {
      readBuf.push(data);
    }
  });
  rs.on('end', function() {
    readBuf = Buffer.concat(readBuf);
    debug('log:' +'UInt32 = ' + readBuf.readInt32BE(0));
    debug('log:' +'Int32 = ' + readBuf.readInt32BE(4));
    debug('log:' +'UInt8 = ' + readBuf.readUInt8(8));
    debug('log:' +'Int8 = ' + readBuf.readInt8(9));
    debug('log:' +'Float = ' + readBuf.readFloatBE(10));
    debug('log:' +'Double = ' + readBuf.readDoubleBE(14));
  });
});
