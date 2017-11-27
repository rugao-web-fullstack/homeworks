const fs = require("fs");
const ws = fs.createWriteStream("float.txt");
const rs = fs.createReadStream("float.txt");

const buf = Buffer.allocUnsafe(4);

//---buf.writeFloatBE
buf.writeFloatBE(0x24, 0);
ws.write(buf);

//---buf.readFloatBE
rs.on("data", function(data) {
    console.log(buf.readFloatBE(data));
});