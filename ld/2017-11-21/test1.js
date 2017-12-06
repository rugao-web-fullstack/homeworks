var fs = require('fs');

var ws = fs.createWriteStream('file.txt');
var rs = fs.createReadStream('file.txt');
let buf = Buffer.alloc(32);
var debug = require('debug')('ago');

buf.writeUInt32BE(12341234);
buf.writeInt32BE(-20, 4);
buf.writeUInt8(60, 8);
buf.writeInt8(-60, 9);
buf.writeFloatBE(88.99, 10);
buf.writeDoubleBE(-88.88, 14);

debug('log : '+buf);
ws.write(buf);


var readBuf = [];


ws.end(buf, function() {
    debug('文件已进入文件');
    rs.on('readable', function() {
        var data = rs.read();
        if (data) {
            readBuf.push(data);
        }
    });
    rs.on('end', function() {
        readBuf = Buffer.concat(readBuf);
		
        debug('UInt32 = ' + readBuf.readInt32BE(0));
        debug('Int32 = ' + readBuf.readInt32BE(4));
        debug('UInt8 = ' + readBuf.readUInt8(8));
        debug('Int8 = ' + readBuf.readInt8(9));
        debug('Float = ' + readBuf.readFloatBE(10));
        debug('Double = ' + readBuf.readDoubleBE(14));
    });
});
