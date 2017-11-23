const fs = require('fs');
const ws = fs.createWriteStream('./buffer.txt');
const rs = fs.createReadStream('./buffer.txt');
//uint32
const buf = Buffer.alloc(18);
buf.writeUInt32BE(0x12345678, 0);
ws.write(buf);
ws.end();
ws.on('finish', function () {
    console.log('写入');
    rs.on('data', function (chunk) {
        const data = chunk.readUInt32BE(0);
        console.log(data.toString(10));
    });
    rs.on('end', function () {
        console.log('完毕');
    });
});

