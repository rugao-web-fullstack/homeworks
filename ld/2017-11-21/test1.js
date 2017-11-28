const fs = require("fs");

const ws = fs.createWriteStream('file.txt');
const rs = fs.createReadStream('file.txt');
let buf = Buffer.alloc(32);

buf.writeUInt32BE(12341234);
buf.writeInt32BE(-20, 4);
buf.writeUInt8(60, 8);
buf.writeInt8(-60, 9);
buf.writeFloatBE(88.99, 10);
buf.writeDoubleBE(-88.88, 14);

console.log(buf);
ws.write(buf);


var readBuf = [];


ws.end(buf, function() {
    console.log("文件已进入文件");
    rs.on("readable", function() {
        var data = rs.read();
        if (data) {
            readBuf.push(data);
        }
    });
    rs.on("end", function() {
        readBuf = Buffer.concat(readBuf);
        console.log("UInt32 = " + readBuf.readInt32BE(0));
        console.log("Int32 = " + readBuf.readInt32BE(4));
        console.log("UInt8 = " + readBuf.readUInt8(8));
        console.log("Int8 = " + readBuf.readInt8(9));
        console.log("Float = " + readBuf.readFloatBE(10));
        console.log("Double = " + readBuf.readDoubleBE(14));
    });
});