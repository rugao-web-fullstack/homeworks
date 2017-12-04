var debug = require('debug')('uint8');

const fs = require('fs');
const ws = fs.createWriteStream('uint8.txt');
const rs = fs.createReadStream('uint8.txt');

const buf = Buffer.allocUnsafe(4);

//---buf.writeUInt8
buf.writeUInt8(0x3, 0);
ws.write(buf);

//---buf.readUInt8
rs.on('data', function (data) {
    debug('log: ' + buf.readUInt8(data));
});

