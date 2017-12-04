const fs = require("fs");
const ws = fs.createWriteStream("demo.txt");

var writeBuff = Buffer.alloc(22);
writeBuff.writeUInt32BE(0xfeedface, 0);
writeBuff.writeInt32BE(-10, 4);
writeBuff.writeUInt8(0x23, 8);
writeBuff.writeInt8(-10, 9);
writeBuff.writeFloatBE(1.23, 10);
writeBuff.writeDoubleBE(-1.23, 14);

ws.end(writeBuff, function() {
	console.log("导入成功");
});