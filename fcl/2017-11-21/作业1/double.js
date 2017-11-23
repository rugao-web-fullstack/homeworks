const fs = require("fs");
const ws = fs.createWriteStream("double.txt");
const rs = fs.createReadStream("double.txt");


const buf = Buffer.allocUnsafe(8);

buf.writeDoubleBE(0x1,0);
ws.write(buf);

//---buf.readUInt32BE(offset[, noAssert])
rs.on("data",function (data) {
    console.log(buf.readDoubleBE(data));
});
