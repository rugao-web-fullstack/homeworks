var fs = require('fs');
var ws = fs.createWriteStream('demo.txt');
var rs = fs.createReadStream('demo.txt');
var debug = require('debug');

var writeBuff = Buffer.alloc(22);
writeBuff.writeUInt32BE(100, 0);
writeBuff.writeInt32BE(-100, 4);
writeBuff.writeUInt8(100, 8);
writeBuff.writeInt8(-100, 9);
writeBuff.writeFloatBE(88.88, 10);
writeBuff.writeDoubleBE(-888.888, 14);

var readBuff = [];

ws.end(writeBuff, function () {
  debug('文件写入完成!');

  rs.on('readable', function () {
    var data = rs.read();
    if(data){
      readBuff.push(data);
    }
  });

  rs.on('end', function () {
    readBuff = Buffer.concat(readBuff);
    debug('从文件中读取出来的值为：');
    debug('UInt32 = ' +readBuff.readInt32BE(0));
    debug('Int32 = ' +readBuff.readInt32BE(4));
    debug('UInt8 = ' +readBuff.readUInt8(8));
    debug('Int8 = ' +readBuff.readInt8(9));
    debug('Float = ' +readBuff.readFloatBE(10));
    debug('Double = ' +readBuff.readDoubleBE(14));
  });

});