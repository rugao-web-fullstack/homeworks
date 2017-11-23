const fs = require("fs");
const ws = fs.createWriteStream("uint8.txt");
const rs = fs.createReadStream("uint8.txt");


const buf = Buffer.allocUnsafe(4);

buf.writeUInt8(0x1, 0);
ws.write(buf);

//---buf.readUInt32BE(offset[, noAssert])
rs.on("data", function (data) {
    console.log(buf.readUInt8(data));
});
