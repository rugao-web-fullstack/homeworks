const fs = require("fs");
const rs = fs.createReadStream("demo.txt");

var readBuff = [];

rs.on("readable", function () {
    var data = rs.read();
    if (data) {
        readBuff.push(data);
    }
});
rs.on("end", function () {
    readBuff = Buffer.concat(readBuff);
    console.log("UInt32 = " + readBuff.readUInt32BE(0).toString(16));
    console.log("Int32 = " + readBuff.readInt32BE(4));
    console.log("UInt8 = " + readBuff.readUInt8(8));
    console.log("Int8 = " + readBuff.readInt8(9));
    console.log("Float = " + readBuff.readFloatBE(10));
    console.log("Double = " + readBuff.readDoubleBE(14));
});