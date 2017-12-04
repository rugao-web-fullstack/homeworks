var debug = require('debug')('xxx');

var fs = require('fs');
var ws = fs.createWriteStream('demo.txt');
var rs = fs.createReadStream('demo.txt');

var writeBuff = Buffer.alloc(22);
writeBuff.writeUInt32BE(100, 0);
writeBuff.writeInt32BE(-100, 4);
writeBuff.writeUInt8(100, 8);
writeBuff.writeInt8(-100, 9);
writeBuff.writeFloatBE(88.88, 10);
writeBuff.writeDoubleBE(-888.888, 14);

var readBuff = [];

ws.end(writeBuff, function () {
  debug('info'+'文件写入完成!');

  rs.on('readable', function () {
    var data = rs.read();
    if(data){
      readBuff.push(data);
    }
  });

  rs.on('end', function () {
    readBuff = Buffer.concat(readBuff);
    debug('info'+'从文件中读取出来的值为：');
    debug('info'+'UInt32 = ' +readBuff.readInt32BE(0));
    debug('info'+'Int32 = ' +readBuff.readInt32BE(4));
    debug('info'+'UInt8 = ' +readBuff.readUInt8(8));
    debug('info'+'Int8 = ' +readBuff.readInt8(9));
    debug('info'+'Float = ' +readBuff.readFloatBE(10));
    debug('info'+'Double = ' +readBuff.readDoubleBE(14));
  });

});